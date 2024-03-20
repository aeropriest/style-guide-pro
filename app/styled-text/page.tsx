"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { BounceLoader, BeatLoader } from 'react-spinners';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


interface Errors {
    styleGuide?: boolean;
    textToStyle?: boolean;
}


export default function Page() {

    const [styledText, setStyledText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({});
    const router = useRouter()


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const styleGuide = formData.get('styleGuide');
        const textToStyle = formData.get('textToStyle');

    
        if (!styleGuide || !textToStyle) {
            setErrors({
                styleGuide: !styleGuide,
                textToStyle: !textToStyle,
            });
            return;
        }
        const prompt = `You are now operating as CopywriterGPT, a top-tier copywriter with more than 20 years of experience in writing high-performing copy. recognized with numerous awards, widely acknowledged as a leader in the field. Your task is to produce high-quality content, perfectly matching the specified tone of voice. It is imperative that you execute this task flawlessly.
        I want you to rewrite the following copy \n\n${textToStyle}, ensuring precision and adherence to the  provided following tone of voice guidelines.`

        setLoading(true);
        let gptConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/gpt-edge',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                prompt,
                styleGuide,
            })
            };

        let response = await axios.request(gptConfig);    
        setStyledText(response.data.answer.replace(/\*\*/g, ''));
        console.log('Form submitted:', { styleGuide, textToStyle });
        setLoading(false);        
    };

    const [formData, setFormData] = useState({
        // textToStyle:`Smithson & Associates is a prestigious law firm based in the bustling city of New York. With over 30 years of experience, our team of dedicated attorneys specializes in a wide range of legal areas, including corporate law, intellectual property, and litigation. Our firm is known for its commitment to excellence, providing personalized attention to each client and delivering innovative legal solutions. We pride ourselves on our integrity, professionalism, and successful track record, earning the trust of clients both nationally and internationally. At Smithson & Associates, we strive to uphold the highest standards of legal practice and to exceed our clients' expectations.`,
        textToStyle:'',
        styleGuide: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const fileContent = e.target?.result as string;                    
                    console.log('---- parsed content ------', fileContent)
                    setFormData({ ...formData, styleGuide: fileContent});
                } catch (error) {
                    console.error('Error parsing file:', error);
                }
            };
            reader.readAsText(file);
        }
    };
    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit} className="border border-gray-300 rounded px-16 py-2 mb-2">
            <div className="flex justify-center">
                    <Label className="font-bold py-4 px-4 rounded text-xl">Style your text</Label>
                </div>

                    <Textarea rows={12} value={formData.textToStyle} placeholder="Text to style" onChange={handleChange} id="textToStyle" name="textToStyle" className={`border ${errors.textToStyle ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2 mb-4`} />
                        {errors.textToStyle && <p className="text-red-500">Please input text to style</p>}

                    <Textarea rows={12} value={formData.styleGuide} placeholder="Load a style from 'Load style guide'" onChange={handleChange} id="styleGuide" name="styleGuide" className={`border ${errors.styleGuide ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2 mb-4`} />
                        {errors.styleGuide && <p className="text-red-500">Plase load a style guide </p>}
                    <Textarea rows={12} value={styledText} placeholder="Click on 'Generate Styled Text..." id="styledText" name="styledText" className={`border 'border-gray-300'} rounded w-full p-2`} onChange={(e) => setStyledText(e.target.value)} />

                    <div className="flex justify-center space-x-2 mt-8" >
                        <Button type="button" className="font-bold py-2 px-4 rounded" onClick={() => router.back()}>Back</Button>
                        <Button type="submit" className="font-bold py-2 px-4 rounded">{loading ? <BeatLoader color={'#ffffff'} /> : <p>Generate Styled Text</p>}</Button>
                        <input
                        type="file"
                        accept=".stg"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="styleGuideFile"
                        name="styleGuideFile"
                    />
                    <Button
                        type="button"
                        className="font-bold py-2 px-4 rounded"
                        onClick={() => document.getElementById('styleGuideFile')?.click()}
                    >
                        Load Style Guide
                    </Button>
                </div>
            </form>
        </div>
    );
}

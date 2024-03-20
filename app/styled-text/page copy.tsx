"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation'

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


    const [errors, setErrors] = useState<Errors>({});
    const router = useRouter()

    const prompt = `You are now operating as CopywriterGPT, a top-tier copywriter with more than 20 years of experience in writing high-performing copy. recognized with numerous awards, widely acknowledged as a leader in the field. Your task is to produce high-quality content, perfectly matching the specified tone of voice. It is imperative that you execute this task flawlessly.
    I want you to rewrite the following copy, ensuring precision and adherence to the  provided tone of voice guidelines.`

    const handleSubmit = (e: any) => {
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

        // Submit the form data and generate the style guide
        console.log('Form submitted:', { styleGuide, textToStyle });
    };

    const [formData, setFormData] = useState({
        textToStyle: '',
        styleGuide: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function generateGuidelinesText(data: any) {
        let text = "";
    
        // Introduction
        text += `Introduction: Brand Voice & Tone Guidelines\n\n`;
        text += `Brand voice and tone guidelines provide a blueprint for how Elite Law Firm communicates through its written contents. These guidelines lay out the values, personality, and sentiments we wish to convey, ensuring we engage our audience in a consistent, relatable, and trustworthy manner. They help to establish a unique brand identity, enhance our customer relationships, and ensure all our messages align with our branding irrespective of channel or writer.\n\n`;
    
        // Guiding Principles
        text += `Voice & Tone Guiding Principles:\n`;
        console.log(data["Guiding Principles"]);
        // data["Guiding Principles"].forEach((principle: any, index: any) => {
        //     text += `${index + 1}. ${principle.Principle}:\n`;
        //     text += `    - Meaning: ${principle.Meaning}\n`;
        //     text += `    - Effect on writing: ${principle["Effect on Writing"]}\n`;
        //     text += `    - Best practice example: "${principle["Example Best Practice Copy"]}"\n`;
        //     text += `    - Not to do: ${principle["Incorrect Copy"]}\n\n`;
        // });
    
        // // Vocabulary, Tone, Cadence
        // text += `Vocabulary:\n${data["Vocabulary"]}\n\n`;
        // text += `Tone:\n${data["Tone"]}\n\n`;
        // text += `Cadence:\n${data["Cadence"]}\n\n`;
    
        // // Marketing Channels
        // text += `Marketing Channels:\n`;
        // Object.entries(data["Marketing Channels"]).forEach(([channel, description]) => {
        //     text += `- ${channel}: ${description}\n`;
        // });
    
        return text;
    }

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const fileContent = e.target?.result as string;
                    console.log('----- file content -----', fileContent);
                    // const parsedData = JSON.parse(fileContent);
                    const parsedData = generateGuidelinesText(fileContent);
                    console.log('---- parsed content ------', parsedData)
                    setFormData({ ...formData, styleGuide: parsedData});
                } catch (error) {
                    console.error('Error parsing file:', error);
                }
            };
            reader.readAsText(file);
        }
    };
    return (
        <div className="container mx-auto p-16">
            <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-16">
            <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className={` ${errors.textToStyle ? 'text-red-500' : ''}`}>Text to Style</AccordionTrigger>
                        <AccordionContent>
                            <Textarea rows={20} value={formData.textToStyle} onChange={handleChange} id="textToStyle" name="textToStyle" className={`border ${errors.textToStyle ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                            {errors.textToStyle && <p className="text-red-500">Sample Text 1 is required</p>}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className={` ${errors.styleGuide ? 'text-red-500' : ''}`}>Style Guide</AccordionTrigger>
                        <AccordionContent>
                            <Textarea rows={20} value={formData.styleGuide} onChange={handleChange} id="styleGuide" name="styleGuide" className={`border ${errors.styleGuide ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                            {errors.styleGuide && <p className="text-red-500">Sample Text 2 is required</p>}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>                
                <div className="flex justify-center space-x-2" >
                    <Button type="button" className="font-bold py-2 px-4 rounded" onClick={() => router.back()}>Back</Button>
                    <Button type="submit" className="font-bold py-2 px-4 rounded">Generate Styled Text</Button>
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
                    Load Style Guide from File
                </Button>
                </div>
            </form>
        </div>
    );
}

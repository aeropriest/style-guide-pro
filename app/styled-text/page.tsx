"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation'
import { BounceLoader, BeatLoader } from 'react-spinners';

import axios from 'axios';
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
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        styleGuide: '',
        textToStyle: '',
    });
    const [htmlContent, setHtmlContent] = useState<React.ReactNode | undefined>('');
    const [jsonContent, setJsonContent] = useState<any>({});

    const router = useRouter();

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
        console.log('Form submitted:', { styleGuide, textToStyle });
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    const json = JSON.parse(e.target.result as string);
                    setJsonContent(json);
                    const parsedJson = parseJson(json);
                    console.log('parsed json ----', parseJson);
                    setHtmlContent(parsedJson);
                }
            };
            reader.readAsText(file);
        }
    };
    
    function parseJson(json: any): React.ReactNode {
        function traverse(obj: any, depth: number = 0): React.ReactNode {
            if (Array.isArray(obj)) {
                return obj.map((item, index) => (
                    <div key={index}>
                        {traverse(item, depth)}
                    </div>
                ));
            } else if (typeof obj === 'object' && obj !== null) {
                return (
                    <div key={depth} className='py-4 text-lg'>
                        {Object.keys(obj).map((key) => (
                            <div key={key}>
                                <b>{key}</b>: {traverse(obj[key], depth + 1)}
                            </div>
                        ))}
                    </div>
                );
            } else {
                return obj;
            }
        }
        return traverse(json);
    }
    
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
                    {htmlContent && <AccordionItem value="item-2">
                        <AccordionTrigger className={` ${errors.styleGuide ? 'text-red-500' : ''}`}>Style Guide</AccordionTrigger>
                        <AccordionContent>
                            {htmlContent}
                        </AccordionContent>
                    </AccordionItem>}
                </Accordion>                
                <div className="flex justify-center space-x-2 mt-8" >
                    <Button type="button" className="font-bold py-2 px-4 rounded" onClick={() => router.back()}>Back</Button>
                    <Button type="submit" className="font-bold py-2 px-4 rounded">Generate Styled Text</Button>
                    <input
                    type="file"
                    accept=".stg"
                    onChange={handleFileChange}
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

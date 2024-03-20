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
    companyName?: boolean;
    coreValues?: boolean;
    sampleText1?: boolean;
    sampleText2?: boolean;
    sampleText3?: boolean;
}


import jsonData from '@/public/elite-law-firm.json'

export default function Page() {
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        companyName: '',
        coreValues: '',
        sampleText1: '',
        sampleText2: '',
        sampleText3: ''
    });
    const [fileContent, setFileContent] = useState<React.ReactNode | undefined>('');
    const [jsonContent, setJsonContent] = useState<any>({});

    const router = useRouter();

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
                    setJsonContent(JSON.parse(e.target.result as string));
                }
            };
            reader.readAsText(file);
        }
    };

    const handleSaveStyleGuide = () => {
        if (jsonContent) {
            const blob = new Blob([JSON.stringify(jsonContent)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'styleguide.stg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    const generateStyleGuide = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const parsedText = parseJson(jsonContent);
        setFileContent(parsedText);
        setLoading(false);
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

    if(fileContent){
        return (<div className="container mx-auto p-16">
        <form onSubmit={generateStyleGuide} className="border border-gray-300 rounded px-16 py-4">
            <div className="flex justify-center">
                <Label className="font-bold py-2 px-4 rounded text-2xl">Recommended Style Guide <p className='text-sm font-small'>{}</p></Label>
            </div>
            <div className="mb-2">
                {fileContent}
                {/* <Textarea rows={40} value={style} id="sampleText1" name="sampleText1" className={`border ${errors.sampleText1 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                {errors.sampleText1 && <p className="text-red-500">Sample Text 1 is required</p>} */}
            </div>
            <div className="flex justify-center space-x-2 mt-4">
                <Button type="button" className="font-bold py-2 px-4 rounded" onClick={() => setFileContent('')}>Back</Button>
                <Button type="submit" className="font-bold py-2 px-4 rounded" onClick={handleSaveStyleGuide}>Save</Button>
            </div>
        </form>
    </div>)
    }
    
    return (
        <div className="container mx-auto p-16">
            <form onSubmit={generateStyleGuide} className="border border-gray-300 rounded p-16">
                <div className="flex justify-center">
                    <Label className="font-bold py-2 px-4 rounded text-lg">Generate Style Guide</Label>
                </div>
                <div className="mb-4">
                    <Label htmlFor="companyName" className="block">Company Name</Label>
                    <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder='Your company name e.g. Elite Law Firm' className={`border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.companyName && <p className="text-red-500">Company Name is required</p>}
                </div>
                <div className="mb-2">
                    <Label htmlFor="coreValues" className="block">Core Values</Label>
                    <Textarea id="coreValues" value={formData.coreValues} onChange={handleChange} name="coreValues" placeholder='Your company values e.g. Your global partner in reimagining healthcare' className={`border ${errors.coreValues ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.coreValues && <p className="text-red-500">Core Values are required</p>}
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className={` ${errors.sampleText1 ? 'text-red-500' : ''}`}>Sample Text 1</AccordionTrigger>
                        <AccordionContent>
                            <Textarea rows={20} value={formData.sampleText1} onChange={handleChange} id="sampleText1" name="sampleText1" className={`border ${errors.sampleText1 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                            {errors.sampleText1 && <p className="text-red-500">Sample Text 1 is required</p>}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className={` ${errors.sampleText2 ? 'text-red-500' : ''}`}>Sample Text 2</AccordionTrigger>
                        <AccordionContent>
                            <Textarea rows={20} value={formData.sampleText2} onChange={handleChange} id="sampleText2" name="sampleText2" className={`border ${errors.sampleText2 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                            {errors.sampleText2 && <p className="text-red-500">Sample Text 2 is required</p>}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className={` ${errors.sampleText3 ? 'text-red-500' : ''}`}>Sample Text 3</AccordionTrigger>
                        <AccordionContent>
                            <Textarea rows={20} value={formData.sampleText3} onChange={handleChange} id="sampleText3" name="sampleText3" className={`border ${errors.sampleText3 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                            {errors.sampleText3 && <p className="text-red-500">Sample Text 3 is required</p>}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="flex justify-center space-x-2 mt-4">
                    <Button type="button" className="font-bold py-2 px-4 rounded" onClick={() => router.back()}>Back</Button>
                    <Button type="submit" className="font-bold py-2 px-4 rounded">{loading ? <BeatLoader color={'#ffffff'} /> : <p>Generate Style Guide</p>}</Button>
                    <div className="flex justify-center space-x-2" >
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
                </div>
            </form>
        </div>
    );
}

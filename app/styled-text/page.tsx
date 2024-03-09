"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation'


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

    return (
        <div className="container mx-auto p-16">
            <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-16">
                <div className="flex justify-center">
                    <Label className="font-bold py-2 px-4 rounded text-lg">Generate Styled Text</Label>
                </div>
                <div className="mb-4">
                    <Label htmlFor="styleGuide" className="block">Style Guide</Label>
                    <Textarea id="styleGuide" name="styleGuide" className={`border ${errors.styleGuide ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.styleGuide && <p className="text-red-500">Sample Text 1 is required</p>}
                </div>

                <div className="mb-4">
                    <Label htmlFor="textToStyle" className="block">Text To Style</Label>
                    <Textarea id="textToStyle" name="textToStyle" className={`border ${errors.textToStyle ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.textToStyle && <p className="text-red-500">Sample Text 2 is required</p>}
                </div>
                <div className="flex justify-center space-x-2" >
                    <Button type="button" className="font-bold py-2 px-4 rounded" onClick={() => router.back()}>Back</Button>
                    <Button type="submit" className="font-bold py-2 px-4 rounded">Generate Styled Text</Button>
                </div>
            </form>
        </div>
    );
}

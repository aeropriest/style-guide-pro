"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';

interface Errors {
    styleGuide?: boolean;
    textToStyle?: boolean;
}

export default function Page() {
    const [errors, setErrors] = useState<Errors>({});

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
                <div className="flex justify-center">
                    <Button type="submit" className="font-bold py-2 px-4 rounded">Generate Styled Text</Button>
                </div>
            </form>
        </div>
    );
}

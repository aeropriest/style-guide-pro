"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation'

interface Errors {
    companyName?: boolean;
    coreValues?: boolean;
    sampleText1?: boolean;
    sampleText2?: boolean;
    sampleText3?: boolean;
}

export default function Page() {
    const [errors, setErrors] = useState<Errors>({});
    const router = useRouter()

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const companyName = formData.get('companyName');
        const coreValues = formData.get('coreValues');
        const sampleText1 = formData.get('sampleText1');
        const sampleText2 = formData.get('sampleText2');
        const sampleText3 = formData.get('sampleText3');

        if (!companyName || !coreValues || !sampleText1 || !sampleText2 || !sampleText3) {
            setErrors({
                companyName: !companyName,
                coreValues: !coreValues,
                sampleText1: !sampleText1,
                sampleText2: !sampleText2,
                sampleText3: !sampleText3,
            });
            return;
        }

        // Submit the form data and generate the style guide
        console.log('Form submitted:', { companyName, coreValues, sampleText1, sampleText2, sampleText3 });
    };

    return (
        <div className="container mx-auto p-16">
            <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-16">
                <div className="flex justify-center">
                    <Label className="font-bold py-2 px-4 rounded text-lg">Generate Style Guide</Label>
                </div>
                <div className="mb-4">
                    <Label htmlFor="companyName" className="block">Company Name</Label>
                    <Input id="companyName" name="companyName" className={`border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.companyName && <p className="text-red-500">Company Name is required</p>}
                </div>

                <div className="mb-4">
                    <Label htmlFor="coreValues" className="block">Core Values</Label>
                    <Textarea id="coreValues" name="coreValues" placeholder='Your company values e.g. Your global partner in reimagining healthcare' value='Your global partner in reimagining healthcare' className={`border ${errors.coreValues ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.coreValues && <p className="text-red-500">Core Values are required</p>}
                </div>

                <div className="mb-4">
                    <Label htmlFor="sampleText1" className="block">Sample Text 1</Label>
                    <Textarea id="sampleText1" name="sampleText1" className={`border ${errors.sampleText1 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.sampleText1 && <p className="text-red-500">Sample Text 1 is required</p>}
                </div>

                <div className="mb-4">
                    <Label htmlFor="sampleText2" className="block">Sample Text 2</Label>
                    <Textarea id="sampleText2" name="sampleText2" className={`border ${errors.sampleText2 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.sampleText2 && <p className="text-red-500">Sample Text 2 is required</p>}
                </div>

                <div className="mb-4">
                    <Label htmlFor="sampleText3" className="block">Sample Text 3</Label>
                    <Textarea id="sampleText3" name="sampleText3" className={`border ${errors.sampleText3 ? 'border-red-500' : 'border-gray-300'} rounded w-full p-2`} />
                    {errors.sampleText3 && <p className="text-red-500">Sample Text 3 is required</p>}
                </div>
                <div className="flex justify-center space-x-2">
                    <Button type="button" className="font-bold py-2 px-4 rounded">Back</Button>
                    <Button type="submit" className="font-bold py-2 px-4 rounded">Generate Style Guide</Button>
                </div>
            </form>
        </div>
    );
}

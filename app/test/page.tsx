"use client"
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';


const StyleGuideParser = () => {
  const [fileContent, setFileContent] = useState<React.ReactNode | undefined>(undefined);

  
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('file loaded')
        if (e.target?.result) {
          const jsonData = JSON.parse(e.target.result as string); // Parse JSON string into an object
          const parsedText = parseJson(jsonData); // Call parseJson with the object
          setFileContent(parsedText);
          }
      };
      reader.readAsText(file);
    }
  };
  
  return (
    <div>
      <input
        type="file"
        accept=".stg"
        onChange={handleFileChange}
        className="mt-4"
      />

      
      <div className='p-4'>{fileContent}</div>
      {/* <Textarea rows={50} value={fileContent} readOnly className="border border-gray-300 rounded w-full p-2" /> */}

      {/* {renderContent(data)} */}
    </div>
  );
};

export default StyleGuideParser;

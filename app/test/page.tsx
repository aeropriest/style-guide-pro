"use client"
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const StyleGuideParser: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<React.ReactNode>('');
  const [jsonContent, setJsonContent] = useState<any>('');

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
        console.log('file loaded');
        if (e.target?.result) {
          const jsonData = JSON.parse(e.target.result as string);
          setJsonContent(jsonData);
          const parsedText = parseJson(jsonData);
          setHtmlContent(parsedText);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    if (jsonContent) {
      const json = JSON.stringify(jsonContent, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
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

  return (
    <div>
      <input
        type="file"
        accept=".stg"
        onChange={handleFileChange}
        className="mt-4"
      />
      <div className='p-4'>{htmlContent}</div>
      {htmlContent && (
        <button onClick={handleSave} className="btn mt-4">
          Save Style Guide
        </button>
      )}
    </div>
  );
};

export default StyleGuideParser;

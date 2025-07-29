"use client"

import React from 'react';
import type { GeneratedContent } from '../../type'

interface ResultsDisplayProps {
    content: GeneratedContent;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ content }) => {
    return (
        <div className="space-y-12">
            <section aria-labelledby="visuals-result-heading">
                <h2 id="visuals-result-heading" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
                    Generated Visuals
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {content.images.map((base64Image, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                             <img
                                src={`data:image/jpeg;base64,${base64Image}`}
                                alt={`Generated visual ${index + 1}`}
                                className="w-full h-full object-cover aspect-video"
                                loading="lazy"
                             />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

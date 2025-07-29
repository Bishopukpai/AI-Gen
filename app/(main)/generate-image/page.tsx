"use client";

import React, { useState, useCallback } from 'react';
import { Header } from "../../../components/image-gen/Header";
import { GeneratorForm } from "../../../components/image-gen/GenerateForm";
import { ResultsDisplay } from "../../../components/image-gen/ResultDisplay";
import { Spinner } from "../../../components/image-gen/Spinner";
import type { GeneratedContent } from "../../../type";

const GenerateImage: React.FC = () => {
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async (topic: string) => {
        if (!topic) {
            setError("Please select or enter a topic first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedContent(null);

        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const result = await response.json();
            setGeneratedContent(result);
        } catch (err: unknown) {
            console.error(err);
            const message = err instanceof Error ? err.message : "An unknown error occurred.";
            setError(`Failed to generate content. ${message}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header />
                <main>
                    <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />

                    {error && (
                        <div className="mt-8 max-w-4xl mx-auto bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {isLoading && (
                        <div className="mt-12 text-center flex flex-col items-center justify-center" role="status" aria-live="polite">
                            <Spinner />
                            <p className="mt-4 text-lg text-gray-300">Generating your content... This may take a moment.</p>
                            <p className="text-sm text-gray-500">The AI is warming up its creative circuits!</p>
                        </div>
                    )}

                    {generatedContent && (
                        <div className="mt-12">
                            <ResultsDisplay content={generatedContent} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default GenerateImage;

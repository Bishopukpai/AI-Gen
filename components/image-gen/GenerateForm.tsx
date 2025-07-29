"use client"
import React, { useState } from 'react';
import { SUGGESTED_TOPICS } from './SuggestedTopics'
import { Spinner } from './Spinner'

interface GeneratorFormProps {
    onGenerate: (topic: string) => void;
    isLoading: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
    const [projectTitle, setProjectTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [customTopic, setCustomTopic] = useState('');
    const [activeTab, setActiveTab] = useState('suggestion');
    const [error, setError] = useState<string | null>(null);

    const handleTopicSelection = (selectedTopic: string) => {
        setTopic(selectedTopic);
        setCustomTopic('');
        setError(null);
        setActiveTab('suggestion');
    };
    
    const handleCustomTopicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setCustomTopic(value);
        setTopic(value);
        setError(null);
    };

    const handleGenerateClick = () => {
        if (!topic.trim()) {
            setError("Topic cannot be empty. Please choose or write a topic.");
            return;
        }
        onGenerate(topic);
    };

    return (
        <section className="form-section max-w-4xl mx-auto bg-gray-800/50 p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-lg">
            <div className="space-y-8">
                <div>
                    <label htmlFor="project-title" className="text-lg font-semibold text-gray-200">1. Project Title (Optional)</label>
                    <input 
                        id="project-title"
                        className="mt-2 w-full border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                        placeholder="e.g., 'My Awesome Tech Channel'" 
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-200">Video Topic</h2>
                    <p className="text-sm text-gray-400 mt-1">Choose a suggested topic or create your own concept.</p>
                    <div className="mt-4">
                        <div className="flex border-b border-gray-600">
                            <button 
                                className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'suggestion' ? 'border-b-2 border-purple-400 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setActiveTab('suggestion')}
                            >
                                Suggestions
                            </button>
                            <button 
                                className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'your_topic' ? 'border-b-2 border-purple-400 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setActiveTab('your_topic')}
                            >
                                Your Topic
                            </button>
                        </div>
                        <div className="mt-4">
                            {activeTab === 'suggestion' && (
                                <div className="flex flex-wrap gap-2">
                                    {SUGGESTED_TOPICS.map((suggestion) => (
                                        <button 
                                            key={suggestion} 
                                            className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ease-in-out ${suggestion === topic ? 'bg-purple-600 text-white shadow-md scale-105' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                            onClick={() => handleTopicSelection(suggestion)}
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {activeTab === 'your_topic' && (
                                <textarea 
                                    className="w-full h-24 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                                    placeholder="e.g., A robot skateboarding on Mars, cinematic style"
                                    value={customTopic}
                                    onChange={handleCustomTopicChange}
                                    onFocus={() => setActiveTab('your_topic')}
                                 />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {error && <div className="mt-4 text-red-400 text-sm" role="alert">{error}</div>}

            <div className="mt-8 pt-6 border-t border-gray-700">
                <button 
                    className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100" 
                    onClick={handleGenerateClick} 
                    disabled={isLoading || !topic.trim()}
                >
                    {isLoading ? (
                        <>
                            <Spinner />
                            <span className="ml-2">Generating...</span>
                        </>
                    ) : (
                        "✨ Generate Content"
                    )}
                </button>
            </div>
        </section>
    );
};

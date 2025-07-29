"use client"

import React, { useState, useCallback } from 'react';

import type { Scene } from '../../../type'
import { SUGGESTIONS } from '../../../components/constants'
import LoadingSpinner from '../../../components/LoadingSpinner'
import VideoPlayer from '../../../components/Videoplayer'
import { VideoIcon } from '../../../components/icons'


const App: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('suggestion');

    const handleTopicSelection = (selectedTopic: string) => {
        setTopic(selectedTopic);
        setError(null);
    };

    const handleGenerateClick = useCallback(async () => {
    if (!topic.trim()) {
        setError("Please select or enter a topic first.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setScenes([]);

    try {
        const response = await fetch('/api/generate-video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate video. Please try again.');
        }

        const data = await response.json();
        setScenes(data); // assuming `data` is an array of `Scene`
    } catch (err: any) {
        setError(err.message || 'An unknown error occurred while generating the video.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
}, [topic]);


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
            <main className="max-w-4xl mx-auto flex flex-col items-center gap-12">
                <header className="text-center w-full">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                        AI Video Generator
                    </h1>
                    <p className="text-lg text-gray-400">Instantly craft compelling video storyboards from a simple idea.</p>
                </header>

                <section className="w-full bg-gray-800/50 rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-lg">
                    <div className="flex flex-col gap-6">
                        <div>
                            <label htmlFor="topic-input" className="text-xl font-bold text-gray-200 mb-2 block">1. What's your video about?</label>
                            <p className="text-gray-400 mb-4">Choose a suggestion or enter your own topic below.</p>
                            <div className="border-b border-gray-600 mb-4">
                                <div className="flex space-x-4" role="tablist" aria-label="Topic Selection">
                                    <button 
                                        id="tab-suggestion"
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'suggestion' ? 'border-b-2 border-purple-400 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                                        role="tab"
                                        aria-selected={activeTab === 'suggestion'}
                                        onClick={() => setActiveTab('suggestion')}
                                    >
                                        Suggestions
                                    </button>
                                    <button 
                                        id="tab-your-topic"
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'your_topic' ? 'border-b-2 border-purple-400 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                                        role="tab"
                                        aria-selected={activeTab === 'your_topic'}
                                        onClick={() => setActiveTab('your_topic')}
                                    >
                                        Your Topic
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div id="panel-suggestion" role="tabpanel" data-state={activeTab === 'suggestion' ? 'active' : 'inactive'}>
                                   <div className="flex flex-wrap gap-2 suggestion-buttons">
                                        {SUGGESTIONS.map((suggestion) => (
                                            <button 
                                                key={suggestion} 
                                                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ease-in-out ${suggestion === topic ? 'bg-purple-600 text-white shadow-lg scale-105' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                                onClick={() => handleTopicSelection(suggestion)}
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                   </div>
                                </div>
                                <div id="panel-your-topic" role="tabpanel" data-state={activeTab === 'your_topic' ? 'active' : 'inactive'}>
                                     <textarea 
                                        id="topic-input"
                                        className="w-full h-24 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                                        aria-label="Your custom topic"
                                        placeholder="e.g., A robot skateboarding on Mars, cinematic style"
                                        value={activeTab === 'your_topic' ? topic : ''}
                                        onChange={(e) => handleTopicSelection(e.target.value)}
                                        onFocus={() => setActiveTab('your_topic')}
                                     />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-bold text-gray-200 mb-2">2. Generate Your Video</h2>
                            <button 
                                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-purple-500/50"
                                onClick={handleGenerateClick}
                                disabled={isLoading || !topic.trim()}
                            >
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner />
                                        <span role="status">Generating...</span>
                                    </>
                                ) : (
                                    <>
                                        <VideoIcon className="h-6 w-6" />
                                        <span>Generate Video</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </section>

                {error && <div className="mt-4 w-full bg-red-900/50 text-red-300 border border-red-700 rounded-lg p-4 text-center fade-in" role="alert">{error}</div>}

                {isLoading && (
                    <div className="text-center w-full fade-in" role="status" aria-live="polite">
                        <p className="text-lg text-purple-300">Generating your video storyboard...</p>
                        <p className="text-sm text-gray-400 mt-1">This may take a minute. Please wait.</p>
                    </div>
                )}
                
                {scenes.length > 0 && !isLoading && (
                    <VideoPlayer scenes={scenes} />
                )}

            </main>
        </div>
    );
}

export default App;

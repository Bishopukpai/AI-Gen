"use client"
import React, { useState } from 'react'
const suggestions = [
    "Reaction Videos",
    "Challenges",
    "Memes",
    "Quick Tips",
    "Myth Busting",
    "Did You Know?",
    "Word Definitions",
    "Word of the Day",
    "Mini Storytime",
    "Kiddies Story time",
    "Adventure Story",
    "Quotes",
    "News",
    "Crime Story",
    "Horror Story",
    "Tech Innovations",
    "Movie Scenes",
    "Science Experiment"
]
const Topic = ({}) => {

    const [projectTitle, setProjectTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [activeTab, setActiveTab] = useState('suggestion');
    const [generatedScript, setGeneratedScript] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const GenerateScript = async () => {
        if (!topic) {
            setError("Please select or enter a topic first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedScript('');

        try {
            const response = await fetch('/api/generate-script', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong with the request.');
            }

            const data = await response.json();
            setGeneratedScript(data.script);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTopicSelection = (selectedTopic: string) => {
        setTopic(selectedTopic);
        setError(null);
        if (activeTab === 'your_topic') {
            setActiveTab('suggestion');
        }
    };

    console.log(projectTitle)
    
  return (
     <main className="container" role="main">
            <header className="header">
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    AI Script Generator
                </h1>
                <p>Instantly craft compelling scripts and visuals for your next viral video.</p>
            </header>
            
            <section className="form-section" aria-labelledby="form-heading">
                <div className="form-group">
                    <h2 id="form-heading">Project Title (optional)</h2>
                    <input 
                        className="mt-2 w-full border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                        aria-label="Project Title"
                        placeholder="e.g., 'My Awesome Tech Channel'" 
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <h2>2. Video Topic</h2>
                    <p>Choose a suggested topic or create your own concept.</p>
                    <div>
                        <div className="tabs-list" role="tablist" aria-label="Topic Selection">
                            <button 
                                id="tab-suggestion"
                                className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'suggestion' ? 'border-b-2 border-purple-400 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                                role="tab"
                                aria-selected={activeTab === 'suggestion'}
                                aria-controls="panel-suggestion"
                                data-state={activeTab === 'suggestion' ? 'active' : 'inactive'}
                                onClick={() => setActiveTab('suggestion')}
                            >
                                Suggestions
                            </button>
                            <button 
                                id="tab-your_topic"
                                className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'your_topic' ? 'border-b-2 border-purple-400 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                                role="tab"
                                aria-selected={activeTab === 'your_topic'}
                                aria-controls="panel-your_topic"
                                data-state={activeTab === 'your_topic' ? 'active' : 'inactive'}
                                onClick={() => setActiveTab('your_topic')}
                            >
                                Your Topic
                            </button>
                        </div>
                        <div 
                            id="panel-suggestion"
                            className="tab-content"
                            role="tabpanel"
                            aria-labelledby="tab-suggestion"
                            data-state={activeTab === 'suggestion' ? 'active' : 'inactive'}>
                           <div className="suggestion-buttons">
                                {suggestions.map((suggestion) => (
                                    <button 
                                        key={suggestion} 
                                        className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ease-in-out ${suggestion === topic ? 'bg-purple-600 text-white shadow-md scale-105' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                        onClick={() => handleTopicSelection(suggestion)}
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                           </div>
                        </div>
                        <div 
                            id="panel-your_topic"
                            className="tab-content"
                            role="tabpanel"
                            aria-labelledby="tab-your_topic"
                            data-state={activeTab === 'your_topic' ? 'active' : 'inactive'}>
                             <textarea 
                                className="w-full h-24  border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                                aria-label="Your custom topic"
                                placeholder="e.g., A robot skateboarding on Mars, cinematic style"
                                onChange={(e) => {
                                  setTopic(e.target.value)
                                  setError(null);
                                }}
                                onFocus={() => setActiveTab('your_topic')}
                             />
                        </div>
                    </div>
                </div>

                <button  className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"  onClick={GenerateScript} disabled={isLoading || !topic}>
                    {isLoading ? <><div className="loading-spinner" aria-hidden="true"></div><span role="status">Generating...</span></> : <>✨ Generate Content</>}
                </button>

                {error && <div className="error-message" role="alert">{error}</div>}
            </section>

            {isLoading && <div role="status" aria-live="polite" style={{textAlign: 'center', width: '100%'}}>Generating content...</div>}

            {(generatedScript) && (
                 <div className="results-container">
                     {generatedScript && (
                        <section className="result-section" aria-labelledby="script-result-heading">
                            <h2 id="script-result-heading">Your Generated Script</h2>
                            <p className="result-script">{generatedScript}</p>
                        </section>
                    )}
                 </div>
            )}
        </main>
  )
}

export default Topic
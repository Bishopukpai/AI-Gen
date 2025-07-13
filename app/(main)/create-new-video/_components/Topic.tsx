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
                <h1>AI Video & Script Generator</h1>
                <p>Instantly craft compelling scripts and visuals for your next viral video.</p>
            </header>
            
            <section className="form-section" aria-labelledby="form-heading">
                <div className="form-group">
                    <h2 id="form-heading">1. Project Title</h2>
                    <input 
                        className="input"
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
                                className="tab-trigger" 
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
                                className="tab-trigger"
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
                                        className={`suggestion-btn ${suggestion === topic ? 'active' : ''}`}
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
                                className="textarea"
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

                <button className="generate-btn" onClick={GenerateScript} disabled={isLoading || !topic}>
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
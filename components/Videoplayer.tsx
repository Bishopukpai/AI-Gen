
import React, { useState, useEffect } from 'react';
import type { Scene } from '../type'
import { PlayIcon, PauseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons'

interface VideoPlayerProps {
    scenes: Scene[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ scenes }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        setCurrentIndex(0);
        setIsPlaying(true);
    }, [scenes]);

    useEffect(() => {
        if (isPlaying && scenes.length > 0) {
            const timer = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % scenes.length);
            }, 5000); // Change scene every 5 seconds
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isPlaying, scenes.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + scenes.length) % scenes.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % scenes.length);
    };
    
    if (!scenes || scenes.length === 0) {
        return null;
    }

    const currentScene = scenes[currentIndex];

    return (
        <section className="w-full max-w-4xl mx-auto fade-in" aria-labelledby="video-player-heading">
            <h2 id="video-player-heading" className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Generated Video Storyboard</h2>
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl shadow-purple-900/40 relative group">
                {scenes.map((scene, index) => (
                     <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                        <img src={scene.imageUrl} alt={scene.scene_description} className="w-full h-full object-cover scene-image" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>
                ))}

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                     <p className="text-lg md:text-xl font-semibold text-center transition-opacity duration-500" key={currentIndex}>{currentScene.voiceover}</p>
                </div>
                
                <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 z-20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={goToPrevious} className="bg-black/50 rounded-full p-2 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Previous scene"><ChevronLeftIcon className="h-8 w-8 text-white" /></button>
                    <button onClick={goToNext} className="bg-black/50 rounded-full p-2 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Next scene"><ChevronRightIcon className="h-8 w-8 text-white" /></button>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-4">
                    {scenes.map((_, index) => (
                        <div key={index} className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-6 bg-purple-400' : 'w-2 bg-gray-400'}`}></div>
                    ))}
                </div>
                 <button onClick={() => setIsPlaying(!isPlaying)} className="absolute top-4 right-4 z-20 bg-black/50 rounded-full p-2 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white" aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}>
                    {isPlaying ? <PauseIcon className="h-6 w-6 text-white"/> : <PlayIcon className="h-6 w-6 text-white"/>}
                 </button>
            </div>
        </section>
    );
};

export default VideoPlayer;

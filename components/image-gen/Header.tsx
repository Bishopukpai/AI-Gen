"use client"
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center mb-10">
            <h1 className="text-4xl p-4 sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                AI Image Generator
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Instantly craft compelling scripts and visuals for your next viral video.
            </p>
        </header>
    );
};

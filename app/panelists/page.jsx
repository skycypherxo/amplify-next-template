"use client";

import { useState } from 'react';
import data from './data.json';

export default function Panelist() {
    const [expandedCards, setExpandedCards] = useState({});
    const [highlightedCard, setHighlightedCard] = useState(null);

    const toggleCard = (section, id) => {
        const key = `${section}-${id}`;
        setExpandedCards(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
        setHighlightedCard(prev => (prev === key ? null : key));
    };

    const renderCard = (person, sectionKey, showMoreInfo = true) => {
        const key = `${sectionKey}-${person.id}`;
        const isSpeaker = sectionKey.includes('speaker');
        const isPartner = sectionKey.includes('partner');
        const isPanelist = sectionKey.includes('panelist');
        const isChiefGuest = sectionKey.includes('chief');
        const isSpecial = sectionKey.includes('special');
        
        return (
            <div 
                className={`p-2 md:p-4 flex flex-col items-center justify-center
                    ${highlightedCard === key ? 'ring-2 ring-blue-500' : ''}`}
                key={key}
            >
                <div className="flex items-center justify-center w-full">
                    <img 
                        src={person.image} 
                        alt={person.name} 
                        style={{
                            width: isPanelist ? '192px' : 
                                   isChiefGuest ? '300px' : 
                                   isSpeaker ? '260px' :
                                   isPartner ? '260px' : 
                                   isSpecial ? '260px' : '160px',
                            height: isPanelist ? '192px' : 
                                    isChiefGuest ? '300px' : 
                                    isSpeaker ? '260px' :
                                    isPartner ? '160px' : 
                                    isSpecial ? '260px' : '160px',
                            objectFit: 'cover'
                        }}
                        className="mb-2 md:mb-4"
                    />
                </div>
                {!isPartner && (
                    <h3 className={`text-base md:text-lg font-bold text-center mb-2 uppercase
                        ${isSpeaker ? 'text-white' : ''}`}>
                        {person.name}
                    </h3>
                )}
                {showMoreInfo && (
                    <>
                        <p className={`text-xs md:text-sm text-center mb-2 md:mb-4
                            ${isSpeaker ? 'text-white' : 'text-gray-600'}`}>
                            {person.info}
                        </p>
                        <div 
                            className={`transition-all duration-300 overflow-hidden
                                ${expandedCards[key] ? 'max-h-40' : 'max-h-0'}`}
                        >
                            <p className={`text-xs md:text-sm ${isSpeaker ? 'text-white' : 'text-gray-600'}`}>
                                Additional information about {person.name}
                            </p>
                        </div>
                        <button 
                            onClick={() => toggleCard(sectionKey, person.id)}
                            className="mt-2 md:mt-4 px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white text-sm md:text-base hover:bg-blue-700 transition-colors"
                        >
                            {expandedCards[key] ? 'Read Less' : 'Read More'}
                        </button>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header 
                className="bg-[url('/panelist-head.jpg')] bg-cover bg-center h-[400px] md:h-[700px] flex flex-col items-center justify-center text-white px-4"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Speakers & Panelists</h1>
                <hr className="w-3/4 md:w-1/2 border-t-2 border-white my-4" />
                <p className="text-2xl md:text-4xl text-center">MAHA CSR 2025</p>
            </header>

            {/* Chief Guests */}
            <section className="max-w-7xl mx-auto py-8 md:py-16 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">CHIEF GUESTS</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {data.people.slice(0, 3).map(person => renderCard(person, 'chief'))}
                </div>
            </section>

            {/* Special Guests */}
            <section className="max-w-7xl mx-auto py-8 md:py-16 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">SPECIAL GUESTS</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {data.people.slice(0, 3).map(person => renderCard(person, 'special'))}
                </div>
            </section>

            {/* Speakers */}
            <section className="bg-[#0b3d83] py-8 md:py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 md:mb-12">SPEAKERS</h2>
                    {[0, 1, 2].map(row => (
                        <div key={`speaker-row-${row}`} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-12">
                            {data.people.slice(0, 4).map(person => renderCard(person, `speaker-${row}`))}
                        </div>
                    ))}
                </div>
            </section>

            {/* Panelists */}
            <section className="max-w-7xl mx-auto py-8 md:py-16 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">PANELISTS</h2>
                {[0, 1, 2].map(row => (
                    <div key={`panelist-row-${row}`} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-8 md:mb-12">
                        {data.people.slice(0, 5).map(person => renderCard(person, `panelist-${row}`, false))}
                    </div>
                ))}
            </section>

            {/* Partners */}
            <section className="bg-[#0b3d83] py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-white mb-12">PARTNERS</h2>
                    {[0, 1].map(row => (
                        <div key={`partner-row-${row}`} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {data.people.slice(0, 3).map(person => renderCard(person, `partner-${row}`, false))}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
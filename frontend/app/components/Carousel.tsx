import React, { useState } from 'react';
import Card from './Card';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cards = [
        { id: 1, content: 'Card 1 Content' },
        { id: 2, content: 'Card 2 Content' },
        { id: 3, content: 'Card 3 Content' },
    ];

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="overflow-hidden rounded-lg shadow-lg">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`transition-transform duration-500 ease-in-out transform ${
                            index === currentIndex ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <Card content={card.content} title="example" imageUrl="com.com"/>
                    </div>
                ))}
            </div>
            <button onClick={prevCard} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l">
                Prev
            </button>
            <button onClick={nextCard} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r">
                Next
            </button>
        </div>
    );
};

export default Carousel;
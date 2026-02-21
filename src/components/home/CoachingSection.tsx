"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    "/library-interior-1.jpg",
    "/library-interior-2.jpg",
    "/library-interior-3.jpg",
    "/library-interior-4.jpg",
    "/library-interior-5.jpg",
    "/library-interior-6.jpg",
];

export function CoachingSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((current) => (current + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((current) => (current + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((current) => (current - 1 + images.length) % images.length);
    };

    return (
        <section id="coaching" className="py-8">
            <h2 className="text-2xl font-semibold mb-6">Coaching</h2>

            <div className="relative group rounded-3xl overflow-hidden border bg-white shadow-sm flex flex-col max-w-5xl mx-auto">
                <div className="relative aspect-[16/8] overflow-hidden">
                    {images.map((img, index) => (
                        <img
                            key={img}
                            src={img}
                            alt={`Coaching Interior ${index + 1}`}
                            className={cn(
                                "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
                                index === currentIndex ? "opacity-100" : "opacity-0"
                            )}
                        />
                    ))}

                    {/* Slide Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    index === currentIndex ? "bg-white w-4" : "bg-white/50"
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Label Section */}
                <div className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white font-bold text-xs">
                        N
                    </div>
                    <span className="font-semibold text-gray-800">Facilities & Features</span>
                </div>
            </div>
        </section>
    );
}

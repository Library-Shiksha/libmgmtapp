"use client";

import React from "react";
import { cn } from "@/lib/utils";

const classes = [
    {
        title: "Class 8th to 10th",
        subjects: "All subjects",
        time: "Time : 0400PM to 0700PM",
    },
    {
        title: "Class 11th to 12th",
        subjects: "English, Sociology, History & Commerce",
        time: "Time : 0400PM to 0700PM",
    },
    {
        title: "Class 11th to onward",
        subjects: "English",
        time: "Time : 0400PM to 0700PM",
    },
];

export function TrainingClasses() {
    return (
        <section id="training" className="py-12 border-t">
            <h2 className="text-2xl font-semibold mb-8">Training Classes</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {classes.map((cls, index) => (
                    <div
                        key={index}
                        className="bg-sky-200/60 p-8 rounded-[2rem] border border-sky-300/50 shadow-sm flex flex-col items-center justify-center text-center min-h-[160px] hover:bg-sky-200/80 transition-colors duration-300"
                    >
                        <h3 className="text-xl font-medium text-gray-900 mb-4">
                            {cls.title}
                        </h3>
                        <p className="text-lg text-gray-800 leading-tight mb-2">
                            {cls.subjects}
                        </p>
                        <p className="text-md font-semibold text-gray-700">
                            {cls.time}
                        </p>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-gray-900 animate-blink">
                    All batches will be starts from 01 Apr 2026
                </p>
            </div>
        </section>
    );
}

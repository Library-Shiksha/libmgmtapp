"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/home/Navbar";
import { BookOpen, Download, Search, ChevronRight, Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ncertData = [
    {
        class: "8th",
        subjects: [
            { name: "Mathematics", description: "Rational numbers and practical geometry." },
            { name: "Science", description: "Synthetic fibers, metals, and cell structure." },
            { name: "Social Science", description: "Resources and development." },
            { name: "English (Honeydew)", description: "Stories and poetic expression." },
        ]
    },
    {
        class: "9th",
        subjects: [
            { name: "Mathematics", description: "Number systems and coordinate geometry." },
            { name: "Science", description: "Matter, atoms, and biological diversity." },
            { name: "Social Science", description: "Democratic politics and contemporary India." },
            { name: "English (Beehive)", description: "Core literature and comprehension." },
        ]
    },
    {
        class: "10th",
        subjects: [
            { name: "Mathematics", description: "Real numbers, polynomials, and geometry." },
            { name: "Science", description: "Chemical reactions, life processes, and electricity." },
            { name: "Social Science", description: "History, geography, civics, and economics." },
            { name: "English (First Flight)", description: "Literature and language foundation." },
        ]
    },
    {
        class: "11th",
        subjects: [
            { name: "Mathematics", description: "Foundation of sets, functions, and calculus." },
            { name: "Physics Part I & II", description: "Laws of motion, thermodynamics, and waves." },
            { name: "Chemistry Part I & II", description: "Structure of atom and chemical bonding." },
            { name: "Biology", description: "Cell biology and plant physiology." },
            { name: "English (Hornbill/Snapshots)", description: "Prose and poetry collection." },
        ]
    },
    {
        class: "12th",
        subjects: [
            { name: "Mathematics Part I & II", description: "Core calculus, algebra, and vectors." },
            { name: "Physics Part I & II", description: "Electrostatics, optics, and modern physics." },
            { name: "Chemistry Part I & II", description: "Organic, physical and inorganic chemistry." },
            { name: "Biology", description: "Genetics, evolution, and human welfare." },
            { name: "English (Flamingo/Vistas)", description: "Prose and poetry collection." },
        ]
    }
];

export default function NCERTBooksPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBooks = ncertData.map(cls => ({
        ...cls,
        subjects: cls.subjects.filter(sub =>
            sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cls.class.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cls => cls.subjects.length > 0);

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc]">
            <Navbar />

            <main className="container mx-auto px-4 py-12 space-y-12">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">
                        <Bookmark className="w-3 h-3" />
                        Official Textbooks
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                        NCERT Textbooks
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Access the complete collection of NCERT books for classes 8th to 12th. Download PDF chapters for free and study offline.
                    </p>

                    <div className="relative max-w-xl mx-auto mt-8">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by class or subject..."
                            className="pl-10 h-14 shadow-sm rounded-2xl border-slate-200 bg-white ring-offset-orange-500 focus-visible:ring-orange-500"
                        />
                    </div>
                </div>

                <div className="grid gap-16">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((cls) => (
                            <section key={cls.class} className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <h2 className="text-2xl font-bold text-slate-800 whitespace-nowrap">
                                        Class {cls.class}
                                    </h2>
                                    <div className="flex-1 h-px bg-slate-200" />
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {cls.subjects.map((subject) => (
                                        <div
                                            key={subject.name}
                                            className="group relative p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-orange-200 transition-all duration-500 flex flex-col h-full overflow-hidden"
                                        >
                                            {/* Decorative Background Icon */}
                                            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                                                <BookOpen className="w-32 h-32" />
                                            </div>

                                            <div className="p-4 bg-orange-50 text-orange-600 rounded-[1.5rem] w-fit mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                                <BookOpen className="w-7 h-7" />
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors">
                                                {subject.name}
                                            </h3>

                                            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                                                {subject.description}
                                            </p>

                                            <Button variant="outline" className="w-full rounded-2xl gap-3 h-12 border-slate-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-100 transition-all duration-300 group/btn font-semibold">
                                                <Download className="w-4 h-4" />
                                                Download PDF
                                                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))
                    ) : (
                        <div className="text-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-[4rem] space-y-6 max-w-2xl mx-auto w-full">
                            <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                                <Search className="w-10 h-10 text-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-2xl font-bold text-slate-800">No matching books</p>
                                <p className="text-slate-500">Try searching for a different class or subject</p>
                            </div>
                            <Button variant="ghost" onClick={() => setSearchQuery("")} className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                Clear Search
                            </Button>
                        </div>
                    )}
                </div>

                {/* Educational Quote Section */}
                <div className="mt-20 p-1 bg-slate-200 rounded-[3.5rem] shadow-inner">
                    <div className="bg-white rounded-[3.2rem] p-12 md:p-16 text-center space-y-6">
                        <span className="text-orange-500 text-5xl font-serif">"</span>
                        <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed italic max-w-3xl mx-auto">
                            Education is not the learning of facts, but the training of the mind to think.
                        </blockquote>
                        <cite className="block text-slate-500 font-semibold not-italic">
                            — Albert Einstein
                        </cite>
                    </div>
                </div>
            </main>
        </div>
    );
}

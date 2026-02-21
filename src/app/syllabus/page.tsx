"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/home/Navbar";
import { Book, Download, Search, FileText, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const syllabusData = [
    {
        class: "8th",
        subjects: [
            { name: "Science", description: "Basic concepts of force, pressure, and microorganisms." },
            { name: "Mathematics", description: "Rational numbers, exponents, and data handling." },
            { name: "Social Science", description: "Our past, resources, and social life." },
            { name: "English", description: "Enhancing communication and comprehension." },
        ]
    },
    {
        class: "9th",
        subjects: [
            { name: "Science", description: "Exploring matter, energy, and biological systems." },
            { name: "Mathematics", description: "Number systems, polynomials, and linear equations." },
            { name: "Social Science", description: "World history and geographical foundations." },
            { name: "English", description: "Foundation in reading and writing excellence." },
        ]
    },
    {
        class: "10th",
        subjects: [
            { name: "Science", description: "Combined study of physics, chemistry, and biology basics." },
            { name: "Mathematics", description: "Algebra, geometry, and basic trigonometry." },
            { name: "Social Science", description: "History, geography, political science, and economics." },
            { name: "English", description: "Literature, grammar, and composition skills." },
        ]
    },
    {
        class: "11th",
        subjects: [
            { name: "Physics", description: "Foundations of physical laws and motion." },
            { name: "Chemistry", description: "Introduction to chemical bonding and stoichiometry." },
            { name: "Mathematics", description: "Trigonometry, complex numbers, and logic." },
            { name: "Biology", description: "Diversity in living organisms and cell structure." },
        ]
    },
    {
        class: "12th",
        subjects: [
            { name: "Physics", description: "Comprehensive study of mechanics, electromagnetism, and optics." },
            { name: "Chemistry", description: "In-depth look at organic, inorganic, and physical chemistry." },
            { name: "Mathematics", description: "Advanced calculus, algebra, and statistics." },
            { name: "Biology", description: "Detailed study of human physiology, genetics, and ecology." },
        ]
    }
];

export default function SyllabusPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSyllabus = syllabusData.map(cls => ({
        ...cls,
        subjects: cls.subjects.filter(sub =>
            sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cls.class.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cls => cls.subjects.length > 0);

    return (
        <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
            <Navbar />

            <main className="container mx-auto px-4 py-12 space-y-12">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Course Syllabus
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Download and view the latest curriculum for classes 8th to 12th. Stay updated with the prescribed topics and marking schemes.
                    </p>

                    <div className="relative max-w-xl mx-auto mt-8">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search class or subject syllabus..."
                            className="pl-10 h-12 shadow-sm rounded-xl border-gray-200 bg-white"
                        />
                    </div>
                </div>

                <div className="grid gap-12">
                    {filteredSyllabus.length > 0 ? (
                        filteredSyllabus.map((cls) => (
                            <section key={cls.class} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                                        Class {cls.class}
                                    </div>
                                    <div className="flex-1 h-px bg-gray-100" />
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {cls.subjects.map((subject) => (
                                        <div
                                            key={subject.name}
                                            className="group relative p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
                                        >
                                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <Book className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {subject.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1">
                                                {subject.description}
                                            </p>
                                            <Button variant="outline" className="w-full rounded-xl gap-2 h-11 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all group-2">
                                                <Download className="w-4 h-4" />
                                                Download PDF
                                                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white border border-dashed rounded-[3rem] space-y-4">
                            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xl font-bold text-gray-900">No syllabus found</p>
                                <p className="text-gray-500">Try adjusting your search query</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* FAQ/Help Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-3xl font-bold">Confused about the syllabus changes?</h2>
                            <p className="text-blue-100 max-w-md text-lg">
                                Our mentors stay updated with the latest board revisions. Contact us if you need help understanding the updated pattern.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 h-14 rounded-2xl">
                                Talk to Mentor
                            </Button>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                </div>
            </main>
        </div>
    );
}

"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/home/Navbar";
import { Search, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SyllabusCard } from "@/components/syllabus/SyllabusCard";

type ClassType = "8th" | "9th" | "10th" | "11th" | "12th";
const CLASSES: ClassType[] = ["8th", "9th", "10th", "11th", "12th"];
const ITEMS_PER_PAGE = 12;

const allSyllabusItems = [
    // Class 8th
    { id: "8-sci", class: "8th", subject: "Science", description: "Basic concepts of force, pressure, and microorganisms.", pdfUrl: "#" },
    { id: "8-math", class: "8th", subject: "Mathematics", description: "Rational numbers, exponents, and data handling.", pdfUrl: "#" },
    { id: "8-ss", class: "8th", subject: "Social Science", description: "Our past, resources, and social life.", pdfUrl: "#" },
    { id: "8-eng", class: "8th", subject: "English", description: "Enhancing communication and comprehension.", pdfUrl: "#" },
    { id: "8-hindi", class: "8th", subject: "Hindi", description: "Comprehensive study of Hindi literature and grammar.", pdfUrl: "#" },
    // Class 9th
    { id: "9-sci", class: "9th", subject: "Science", description: "Exploring matter, energy, and biological systems.", pdfUrl: "#" },
    { id: "9-math", class: "9th", subject: "Mathematics", description: "Number systems, polynomials, and linear equations.", pdfUrl: "#" },
    { id: "9-ss", class: "9th", subject: "Social Science", description: "World history and geographical foundations.", pdfUrl: "#" },
    { id: "9-eng", class: "9th", subject: "English", description: "Foundation in reading and writing excellence.", pdfUrl: "#" },
    { id: "9-hindi", class: "9th", subject: "Hindi", description: "Exploring Hindi language and literary works.", pdfUrl: "#" },
    // Class 10th
    { id: "10-sci", class: "10th", subject: "Science", description: "Combined study of physics, chemistry, and biology basics.", pdfUrl: "#" },
    { id: "10-math", class: "10th", subject: "Mathematics", description: "Algebra, geometry, and basic trigonometry.", pdfUrl: "#" },
    { id: "10-ss", class: "10th", subject: "Social Science", description: "History, geography, political science, and economics.", pdfUrl: "#" },
    { id: "10-eng", class: "10th", subject: "English", description: "Literature, grammar, and composition skills.", pdfUrl: "#" },
    { id: "10-hindi", class: "10th", subject: "Hindi", description: "Advanced Hindi grammar and prose analysis.", pdfUrl: "#" },
    // Class 11th
    { id: "11-phy", class: "11th", subject: "Physics", description: "Foundations of physical laws and motion.", pdfUrl: "#" },
    { id: "11-chem", class: "11th", subject: "Chemistry", description: "Introduction to chemical bonding and stoichiometry.", pdfUrl: "#" },
    { id: "11-math", class: "11th", subject: "Mathematics", description: "Trigonometry, complex numbers, and logic.", pdfUrl: "#" },
    { id: "11-bio", class: "11th", subject: "Biology", description: "Diversity in living organisms and cell structure.", pdfUrl: "#" },
    { id: "11-eng", class: "11th", subject: "English", description: "Core communicative English and literature.", pdfUrl: "#" },
    // Class 12th
    { id: "12-phy", class: "12th", subject: "Physics", description: "Comprehensive study of mechanics, electromagnetism, and optics.", pdfUrl: "#" },
    { id: "12-chem", class: "12th", subject: "Chemistry", description: "In-depth look at organic, inorganic, and physical chemistry.", pdfUrl: "#" },
    { id: "12-math", class: "12th", subject: "Mathematics", description: "Advanced calculus, algebra, and statistics.", pdfUrl: "#" },
    { id: "12-bio", class: "12th", subject: "Biology", description: "Detailed study of human physiology, genetics, and ecology.", pdfUrl: "#" },
    { id: "12-eng", class: "12th", subject: "English", description: "Advanced English language and literary criticism.", pdfUrl: "#" },
];

export default function SyllabusPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClass, setSelectedClass] = useState<ClassType | "All">("All");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter logic
    const filteredSyllabus = useMemo(() => {
        return allSyllabusItems.filter(item => {
            const matchesSearch = item.subject.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesClass = selectedClass === "All" || item.class === selectedClass;
            return matchesSearch && matchesClass;
        });
    }, [searchQuery, selectedClass]);

    // Pagination logic
    const totalPages = Math.ceil(filteredSyllabus.length / ITEMS_PER_PAGE);
    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredSyllabus.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredSyllabus, currentPage]);

    const handleFilterChange = (cls: ClassType | "All") => {
        setSelectedClass(cls);
        setCurrentPage(1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
            <Navbar />

            <main className="container mx-auto px-4 py-12 space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                            <FileText className="w-3 h-3" />
                            Course Curriculum
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            Latest Syllabus
                        </h1>
                        <p className="text-slate-500 text-lg max-w-xl">
                            Stay ahead with the updated board curriculum for classes 8th to 12th.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search by subject..."
                            className="pl-10 h-11 shadow-sm rounded-xl border-gray-200 bg-white focus-visible:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <Button
                        variant={selectedClass === "All" ? "default" : "outline"}
                        onClick={() => handleFilterChange("All")}
                        className={`rounded-full px-6 transition-all ${selectedClass === "All" ? "bg-slate-900 text-white hover:bg-slate-800" : ""}`}
                    >
                        All Classes
                    </Button>
                    {CLASSES.map((cls) => (
                        <Button
                            key={cls}
                            variant={selectedClass === cls ? "default" : "outline"}
                            onClick={() => handleFilterChange(cls)}
                            className={`rounded-full px-6 transition-all ${selectedClass === cls ? "bg-slate-900 text-white hover:bg-slate-800" : ""}`}
                        >
                            Class {cls}
                        </Button>
                    ))}
                </div>

                {/* Results Grid */}
                <div className="space-y-8">
                    {paginatedItems.length > 0 ? (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {paginatedItems.map((item) => (
                                    <SyllabusCard key={item.id} item={item} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-4 pt-8">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="rounded-xl"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm font-medium text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="rounded-xl"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-24 bg-white border border-dashed rounded-[2.5rem] space-y-4">
                            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xl font-bold text-gray-900">No syllabus items found</p>
                                <p className="text-gray-500">Try adjusting your filters or search query</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Help Section */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-3xl font-bold">Confused about the syllabus changes?</h2>
                            <p className="text-slate-300 max-w-md text-lg">
                                Our mentors stay updated with the latest board revisions. Contact us if you need help understanding the updated pattern.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 font-bold px-8 h-14 rounded-2xl">
                                Talk to Mentor
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/home/Navbar";
import { Search, Filter, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { papersData } from "@/data/papers";
import { PaperCard } from "@/components/papers/PaperCard";
import { PaperClass } from "@/types/paper";

const CLASSES: PaperClass[] = ["8th", "9th", "10th", "11th", "12th"];
const ITEMS_PER_PAGE = 12;

export default function PapersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClass, setSelectedClass] = useState<PaperClass | "All">("All");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter logic
    const filteredPapers = useMemo(() => {
        return papersData.filter(paper => {
            const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                paper.subject.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesClass = selectedClass === "All" || paper.class === selectedClass;
            return matchesSearch && matchesClass;
        });
    }, [searchQuery, selectedClass]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPapers.length / ITEMS_PER_PAGE);
    const paginatedPapers = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredPapers.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredPapers, currentPage]);

    // Reset pagination on filter change
    const handleFilterChange = (cls: PaperClass | "All") => {
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
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Question Papers
                        </h1>
                        <p className="text-gray-500 text-lg max-w-xl">
                            Browse through our extensive library of {papersData.length}+ papers and solutions for classes 8th to 12th.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search papers or subjects..."
                            className="pl-10 h-11 shadow-sm rounded-xl border-gray-200 bg-white"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <Button
                        variant={selectedClass === "All" ? "default" : "outline"}
                        onClick={() => handleFilterChange("All")}
                        className="rounded-full px-6 transition-all"
                    >
                        All Classes
                    </Button>
                    {CLASSES.map((cls) => (
                        <Button
                            key={cls}
                            variant={selectedClass === cls ? "default" : "outline"}
                            onClick={() => handleFilterChange(cls)}
                            className="rounded-full px-6 transition-all"
                        >
                            Class {cls}
                        </Button>
                    ))}
                </div>

                {/* Results Grid */}
                <div className="space-y-8">
                    {paginatedPapers.length > 0 ? (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {paginatedPapers.map((paper) => (
                                    <PaperCard key={paper.id} paper={paper} />
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
                                <p className="text-xl font-bold text-gray-900">No papers found</p>
                                <p className="text-gray-500">Try adjusting your filters or search query</p>
                            </div>
                            <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedClass("All"); }}>
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="bg-blue-600 rounded-[3rem] p-10 text-white overflow-hidden relative shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-3xl font-bold">Need something specific?</h2>
                            <p className="text-blue-100 max-w-md text-lg">
                                If you can't find a specific previous year paper or need solutions for a particular exam, our educators are here to help.
                            </p>
                        </div>
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 h-14 rounded-2xl">
                            Request a Paper
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}

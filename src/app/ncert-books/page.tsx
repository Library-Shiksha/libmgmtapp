"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/home/Navbar";
import { Search, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NCERTBookCard } from "@/components/ncert-books/NCERTBookCard";

type ClassType = "8th" | "9th" | "10th" | "11th" | "12th";
const CLASSES: ClassType[] = ["8th", "9th", "10th", "11th", "12th"];
const ITEMS_PER_PAGE = 12;

const ncertBooks = [
    // Class 8th
    { id: "8-math", class: "8th", subject: "Mathematics", bookUrl: "#", solutionUrl: "#" },
    { id: "8-sci", class: "8th", subject: "Science", bookUrl: "#", solutionUrl: "#" },
    { id: "8-ss", class: "8th", subject: "Social Science", bookUrl: "#", solutionUrl: "#" },
    { id: "8-eng", class: "8th", subject: "English", bookUrl: "#", solutionUrl: "#" },
    { id: "8-hin", class: "8th", subject: "Hindi", bookUrl: "#", solutionUrl: "#" },
    // Class 9th
    { id: "9-math", class: "9th", subject: "Mathematics", bookUrl: "#", solutionUrl: "#" },
    { id: "9-sci", class: "9th", subject: "Science", bookUrl: "#", solutionUrl: "#" },
    { id: "9-ss", class: "9th", subject: "Social Science", bookUrl: "#", solutionUrl: "#" },
    { id: "9-eng", class: "9th", subject: "English", bookUrl: "#", solutionUrl: "#" },
    { id: "9-hin", class: "9th", subject: "Hindi", bookUrl: "#", solutionUrl: "#" },
    // Class 10th
    { id: "10-math", class: "10th", subject: "Mathematics", bookUrl: "#", solutionUrl: "#" },
    { id: "10-sci", class: "10th", subject: "Science", bookUrl: "#", solutionUrl: "#" },
    { id: "10-ss", class: "10th", subject: "Social Science", bookUrl: "#", solutionUrl: "#" },
    { id: "10-eng", class: "10th", subject: "English", bookUrl: "#", solutionUrl: "#" },
    { id: "10-hin", class: "10th", subject: "Hindi", bookUrl: "#", solutionUrl: "#" },
    // Class 11th
    { id: "11-math", class: "11th", subject: "Mathematics", bookUrl: "#", solutionUrl: "#" },
    { id: "11-phy", class: "11th", subject: "Physics", bookUrl: "#", solutionUrl: "#" },
    { id: "11-chem", class: "11th", subject: "Chemistry", bookUrl: "#", solutionUrl: "#" },
    { id: "11-bio", class: "11th", subject: "Biology", bookUrl: "#", solutionUrl: "#" },
    { id: "11-eng", class: "11th", subject: "English", bookUrl: "#", solutionUrl: "#" },
    // Class 12th
    { id: "12-math", class: "12th", subject: "Mathematics", bookUrl: "#", solutionUrl: "#" },
    { id: "12-phy", class: "12th", subject: "Physics", bookUrl: "#", solutionUrl: "#" },
    { id: "12-chem", class: "12th", subject: "Chemistry", bookUrl: "#", solutionUrl: "#" },
    { id: "12-bio", class: "12th", subject: "Biology", bookUrl: "#", solutionUrl: "#" },
    { id: "12-eng", class: "12th", subject: "English", bookUrl: "#", solutionUrl: "#" },
];

export default function NCERTBooksPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClass, setSelectedClass] = useState<ClassType | "All">("All");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter logic
    const filteredBooks = useMemo(() => {
        return ncertBooks.filter(book => {
            const matchesSearch = book.subject.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesClass = selectedClass === "All" || book.class === selectedClass;
            return matchesSearch && matchesClass;
        });
    }, [searchQuery, selectedClass]);

    // Pagination logic
    const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
    const paginatedBooks = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredBooks.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredBooks, currentPage]);

    // Reset pagination on filter change
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider">
                            <Bookmark className="w-3 h-3" />
                            Official Textbooks
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            NCERT Textbooks
                        </h1>
                        <p className="text-slate-500 text-lg max-w-xl">
                            Access the complete collection of NCERT books and solutions for classes 8th to 12th.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search by subject..."
                            className="pl-10 h-11 shadow-sm rounded-xl border-gray-200 bg-white focus-visible:ring-orange-500"
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
                    {paginatedBooks.length > 0 ? (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {paginatedBooks.map((book) => (
                                    <NCERTBookCard key={book.id} book={book} />
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
                                <p className="text-xl font-bold text-gray-900">No books found</p>
                                <p className="text-gray-500">Try adjusting your filters or search query</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

import React from "react";
import { FileText, Download, Eye, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NCERTBookCardProps {
    book: {
        id: string;
        class: string;
        subject: string;
        bookUrl: string;
        solutionUrl?: string;
    };
}

export function NCERTBookCard({ book }: NCERTBookCardProps) {
    return (
        <div className="group p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col gap-4 relative">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                            {book.class}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-50 text-orange-600">
                            NCERT
                        </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
                        Class {book.class} - {book.subject}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {book.subject} • 2025
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                <Button variant="outline" size="sm" className="flex-1 gap-2 rounded-xl text-xs h-9 border-slate-200" asChild>
                    <a href={book.bookUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-3.5 h-3.5" />
                        Book
                    </a>
                </Button>
                {book.solutionUrl && (
                    <Button variant="default" size="sm" className="flex-1 gap-2 rounded-xl text-xs h-9 bg-green-600 hover:bg-green-700" asChild>
                        <a href={book.solutionUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-3.5 h-3.5" />
                            Solution
                        </a>
                    </Button>
                )}
            </div>

            {book.solutionUrl && (
                <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-50" />
                </div>
            )}
        </div>
    );
}

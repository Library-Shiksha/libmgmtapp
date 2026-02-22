import React from "react";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SyllabusCardProps {
    item: {
        id: string;
        class: string;
        subject: string;
        description: string;
        pdfUrl: string;
    };
}

export function SyllabusCard({ item }: SyllabusCardProps) {
    return (
        <div className="group p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col gap-4 relative">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                            Class {item.class}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                            SYLLABUS
                        </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {item.subject}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {item.description}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                <Button variant="outline" size="sm" className="flex-1 gap-2 rounded-xl text-xs h-9 border-slate-200 hover:bg-blue-50 hover:text-blue-600" asChild>
                    <a href={item.pdfUrl} download target="_blank" rel="noopener noreferrer">
                        <Download className="w-3.5 h-3.5" />
                        Download
                    </a>
                </Button>
                <Button variant="default" size="sm" className="flex-1 gap-2 rounded-xl text-xs h-9 bg-blue-600 hover:bg-blue-700" asChild>
                    <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-3.5 h-3.5" />
                        View
                    </a>
                </Button>
            </div>
        </div>
    );
}

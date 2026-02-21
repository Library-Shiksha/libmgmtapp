import React from "react";
import { FileText, Download, Eye, CheckCircle2 } from "lucide-react";
import { Paper } from "@/types/paper";
import { Button } from "@/components/ui/button";

interface PaperCardProps {
    paper: Paper;
}

export function PaperCard({ paper }: PaperCardProps) {
    return (
        <div className="group p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col gap-4">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                            {paper.class}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                            {paper.board}
                        </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {paper.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {paper.subject} • {paper.year}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                <Button variant="outline" size="sm" className="flex-1 gap-2 rounded-xl text-xs h-9" asChild>
                    <a href={paper.paperUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-3.5 h-3.5" />
                        Paper
                    </a>
                </Button>
                {paper.solutionUrl && (
                    <Button variant="default" size="sm" className="flex-1 gap-2 rounded-xl text-xs h-9 bg-green-600 hover:bg-green-700" asChild>
                        <a href={paper.solutionUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-3.5 h-3.5" />
                            Solution
                        </a>
                    </Button>
                )}
            </div>

            {paper.solutionUrl && (
                <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-50" />
                </div>
            )}
        </div>
    );
}

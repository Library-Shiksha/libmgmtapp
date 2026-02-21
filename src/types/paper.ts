export type PaperClass = "8th" | "9th" | "10th" | "11th" | "12th";
export type PaperBoard = "CBSE" | "State Board" | "Competitive";

export interface Paper {
    id: string;
    title: string;
    class: PaperClass;
    subject: string;
    year: string;
    board: PaperBoard;
    paperUrl: string; // URL to the PDF
    solutionUrl?: string; // Optional URL to the solution PDF
    category: string; // e.g., "Board Exam", "Mock Test", "Sample Paper"
}

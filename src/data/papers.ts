import { Paper, PaperClass, PaperBoard } from "@/types/paper";

const subjects = ["Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Science", "Economics", "Accountancy"];
const boards: PaperBoard[] = ["CBSE", "State Board"];
const classes: PaperClass[] = ["8th", "9th", "10th", "11th", "12th"];
const years = ["2024", "2023", "2022", "2021", "2020"];

// Function to generate large set of mock data
const generateMockProject = (count: number): Paper[] => {
    const papers: Paper[] = [];
    for (let i = 1; i <= count; i++) {
        const cls = classes[i % classes.length];
        const subject = subjects[i % subjects.length];
        const year = years[i % years.length];
        const board = boards[i % boards.length];

        papers.push({
            id: `p-${i}`,
            title: `Class ${cls} - ${subject} Final Exam`,
            class: cls,
            subject: subject,
            year: year,
            board: board,
            paperUrl: `/papers/${cls.toLowerCase()}-${subject.toLowerCase()}-${year}.pdf`,
            solutionUrl: i % 2 === 0 ? `/papers/solutions/${cls.toLowerCase()}-${subject.toLowerCase()}-${year}-sol.pdf` : undefined,
            category: "Previous Year Paper"
        });
    }
    return papers;
};

// Initial static data (can be replaced by API call)
export const papersData: Paper[] = [
    // Add real specific ones here first
    {
        id: "1",
        title: "Class 10th - Mathematics",
        class: "10th",
        subject: "Mathematics",
        year: "2025",
        board: "CBSE",
        paperUrl: "/papers/10th-maths-2025.pdf",
        solutionUrl: "/papers/solutions/10th-maths-2025-sol.pdf",
        category: "Board Exam"
    },
    {
        id: "2",
        title: "Class 10th - Mathematics",
        class: "10th",
        subject: "Mathematics",
        year: "2024",
        board: "CBSE",
        paperUrl: "/papers/10th-maths-2024.pdf",
        solutionUrl: "/papers/solutions/10th-maths-2024-sol.pdf",
        category: "Board Exam"
    }    // Generate the rest
    // ...generateMockProject(500)
];

import { Navbar } from "@/components/home/Navbar";
import { TrainingClasses } from "@/components/home/TrainingClasses";

export default function TrainingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <TrainingClasses />
            </main>
        </div>
    );
}

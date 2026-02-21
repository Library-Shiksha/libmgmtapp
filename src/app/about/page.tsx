import { Navbar } from "@/components/home/Navbar";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Navigation Bar */}
            <Navbar />

            <main className="container mx-auto px-4 py-8 space-y-12">
                {/* About Section */}
                <section id="about" className="space-y-4">
                    <div className="grid md:grid-cols-[300px_1fr] gap-6">
                        <div className="bg-gray-200 h-40 rounded-3xl border shadow-sm flex items-center justify-center p-6 text-center text-black font-medium">
                            Near Adarsh Cloth Mill, Adarsh Mill Road, Lashkar, Gwalior, ph 6265734881, 9826251646
                        </div>
                        <div className="bg-gray-200 h-[36rem] rounded-3xl border shadow-sm flex items-center justify-center text-muted-foreground relative overflow-hidden">
                            <img
                                src="/Location.png"
                                alt="Location Map"
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

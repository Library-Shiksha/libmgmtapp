import { Navbar } from "@/components/home/Navbar";
import { GraduationCap, Users, BookOpen, Trophy } from "lucide-react";

export default function CoachingCentrePage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-12 space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Coaching Centre
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-600">
                        Empowering students through quality education and expert guidance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center py-8">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800">Why Choose Shiksha Coaching?</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our coaching centre is dedicated to providing comprehensive learning experiences.
                            Led by Mr. Pavan Vir Singh with 27 years of teaching experience, we focus on
                            individual growth, academic excellence, and overall personality development.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Expert Faculty</h3>
                                    <p className="text-sm text-gray-500">Experienced teachers</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Interactive Study</h3>
                                    <p className="text-sm text-gray-500">Engaging methods</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Result Oriented</h3>
                                    <p className="text-sm text-gray-500">Proven track record</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                    <Trophy className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Holistic Growth</h3>
                                    <p className="text-sm text-gray-500">Beyond academics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[250px] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white mx-auto md:mx-0 bg-gray-100">
                        <img
                            src="/coaching-head.png"
                            alt="Coaching Centre"
                            className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6">
                            <div className="text-white">
                                <p className="text-base font-bold">Mr. Pavan Vir Singh</p>
                                <p className="text-xs opacity-90 font-medium">Founder & Head Mentor</p>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="bg-gray-50 rounded-[3rem] p-12 text-center space-y-8 border shadow-sm">
                    <h2 className="text-3xl font-bold text-gray-800">Join Our Success Story</h2>
                    <p className="max-w-3xl mx-auto text-lg text-gray-600">
                        Enroll today and take the first step towards a brighter future. We offer specialized
                        classes for various competitive exams and school curriculums.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-transform">
                            Enroll Now
                        </button>
                        <button className="px-8 py-4 bg-white text-primary border-2 border-primary font-bold rounded-2xl hover:bg-gray-50 transition-colors">
                            Contact Us
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

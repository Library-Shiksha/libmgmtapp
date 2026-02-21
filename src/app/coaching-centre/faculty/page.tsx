"use client";

import React from "react";
import { Navbar } from "@/components/home/Navbar";
import { Users, GraduationCap, Award, BookOpen, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const facultyData = [
    {
        name: "Mr. Pavanvir Singh",
        role: "Head of English, Social Science and Hindi",
        education: "MA(Eng), BEd, Jiwaji University",
        experience: "27+ Years",
        expertise: ["Article", "Tenses"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh"
    },
    {
        name: "Mr Dharmvir Singh",
        role: "Senior Physics and Maths Faculty",
        education: "M.Sc. Physics, Jiwaji University",
        experience: "20 Years",
        expertise: ["Semiconductor,Law of Motion"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali"
    },
    {
        name: "Mr. Vikram Singh",
        role: "Chemistry Specialist",
        education: "M.Tech Chemical Engineering, BITS Pilani",
        experience: "10+ Years",
        expertise: ["Organic Chemistry", "Physical Chemistry", "Atomic Structure"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
    },
    {
        name: "Ms. Neha Verma",
        role: "Biology & Life Sciences",
        education: "M.Sc. Zoology, Punjab University",
        experience: "8+ Years",
        expertise: ["Cell Biology", "Genetics", "Human Physiology"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha"
    }
];

export default function FacultyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-16 space-y-16">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider mb-2">
                        <Users className="w-4 h-4" />
                        Our Mentors
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-6xl">
                        Expert Faculty
                    </h1>
                    <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">
                        Experienced teachers dedicated to your academic success. Learn from the best minds in the industry.
                    </p>
                </div>

                {/* Faculty Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {facultyData.map((faculty) => (
                        <div
                            key={faculty.name}
                            className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 overflow-hidden group"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                {/* Profile Image */}
                                <div className="relative">
                                    <div className="w-40 h-40 rounded-[2.5rem] bg-blue-50 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={faculty.image}
                                            alt={faculty.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 p-3 bg-blue-600 text-white rounded-2xl shadow-lg group-hover:rotate-12 transition-transform">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-4 text-center md:text-left">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                            {faculty.name}
                                        </h3>
                                        <p className="text-blue-600 font-semibold">{faculty.role}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-sm">
                                            <Award className="w-4 h-4 text-blue-400" />
                                            <span>{faculty.education}</span>
                                        </div>
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-sm">
                                            <BookOpen className="w-4 h-4 text-blue-400" />
                                            <span>{faculty.experience} Experience</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                                        {faculty.expertise.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Contact/Action Area */}
                            <div className="mt-8 pt-8 border-t border-slate-50 flex flex-wrap gap-4 items-center justify-between">
                                <div className="flex gap-4">
                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </button>
                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                </div>
                                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-2 font-bold group/btn">
                                    View Full Profile
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="bg-slate-900 rounded-[4rem] p-12 text-center space-y-8 relative overflow-hidden shadow-2xl mt-8">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]" />
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-3xl font-bold text-white">Want to join our faculty?</h2>
                        <p className="text-slate-400 max-w-md mx-auto">
                            We are always looking for passionate educators who want to make a difference.
                        </p>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 h-14 rounded-2xl shadow-xl shadow-blue-500/20">
                            Apply for Faculty Position
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}

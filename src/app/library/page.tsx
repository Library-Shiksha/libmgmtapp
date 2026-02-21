import Link from "next/link";
import { Navbar } from "@/components/home/Navbar";
import { Gallery } from "@/components/library/Gallery";

const libraryImages = [
    "/library-interior-1.jpg",
    "/library-interior-2.jpg",
    "/library-interior-3.jpg",
    "/library-interior-4.jpg",
    "/library-interior-5.jpg",
    "/library-interior-6.jpg",
];

export default function LibraryPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-8 space-y-8">
                <h1 className="text-3xl font-bold text-gray-800">Library</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Main Info Card */}
                    <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-6">
                        <Gallery images={libraryImages} />
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Facilities & Features</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Quiet study environment</li>
                                <li>High-speed Wi-Fi access</li>
                                <li>Comfortable seating arrangements</li>
                                <li>Fully air-conditioned</li>
                                <li>Power backup available</li>
                                <li>Parking Available</li>
                                <li>RO Water</li>
                                <li>Separate Rooms for Girls</li>
                                <li>CCTV Coverage</li>
                                <li>Locker Facility</li>
                                <li>Separate Washroom for Girls</li>
                                <li>Separate Dining Space for Lunch & Refreshments</li>
                            </ul>
                        </div>
                    </div>

                    {/* Actions & Links */}
                    <div className="space-y-6">
                        <div className="grid gap-4">
                            <Link href="/library/layout" className="block p-6 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-2xl transition-all duration-300">
                                <h3 className="text-lg font-bold text-blue-900 mb-1">View Layout</h3>
                                <p className="text-blue-700 text-sm font-medium">Check the seating arrangement and facility map.</p>
                            </Link>

                            <Link href="/login" className="block p-6 bg-green-50 hover:bg-green-100 border border-green-100 rounded-2xl transition-all duration-300">
                                <h3 className="text-lg font-bold text-green-900 mb-1">Online Booking</h3>
                                <p className="text-green-700 text-sm font-medium">Reserve your seat in advance.</p>
                            </Link>

                            <Link href="/login" className="block p-6 bg-purple-50 hover:bg-purple-100 border border-purple-100 rounded-2xl transition-all duration-300">
                                <h3 className="text-lg font-bold text-purple-900 mb-1">Subscription Plans</h3>
                                <p className="text-purple-700 text-sm font-medium">View membership options and pricing.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

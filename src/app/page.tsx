import { Navbar } from "@/components/home/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start">
          {/* Left Side - Poster Image */}
          <div className="sticky top-24">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-md border bg-gray-100">
              <img
                src="/library-poster.png"
                alt="Shiksha Library Poster"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-12">
            {/* Coaching Heads Section */}
            <section id="coaching-heads" className="grid md:grid-cols-[250px_1fr] gap-6">
              <div className="flex flex-col gap-2">
                <div className="bg-gray-200 w-full aspect-[3/4] rounded-md flex items-center justify-center border text-muted-foreground relative overflow-hidden">
                  <img
                    src="/coaching-head.png"
                    alt="Coaching Head - Mr Pavan Vir Singh"
                    className="object-cover object-top w-full h-full"
                  />
                </div>
                <p className="text-center font-medium text-gray-800">Mr Pavanvir Singh, MA(Eng), BEd</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-md border shadow-sm">
                <p className="text-lg leading-relaxed text-gray-800 font-bold">
                  Library and Coaching heads by Mr Pavan Vir Singh, is an 27 years
                  of Teaching experience in various Schools and Colleges as an English
                  Teacher
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

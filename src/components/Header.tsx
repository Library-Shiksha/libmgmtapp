import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-center">
                <Link href="/" className="flex items-center gap-3 font-bold text-xl text-primary hover:text-blue-600 transition-colors">
                    <div className="relative h-10 w-10">
                        <Image
                            src="/book-icon.svg"
                            alt="Shiksha Library Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-center">
                        Shiksha Library An Innovative Class
                    </span>
                </Link>
            </div>
        </header>
    );
}

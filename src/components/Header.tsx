import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-24 items-center justify-center">
                <Link href="/" className="flex items-center gap-4 font-bold text-xl text-primary hover:text-blue-600 transition-colors">
                    <div className="relative h-20 w-40">
                        <Image
                            src="/logo.png"
                            alt="Shiksha Library Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
            </div>
        </header>
    );
}

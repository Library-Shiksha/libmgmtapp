import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-24 items-center justify-center">
                <Link href="/" className="flex items-center gap-6 hover:opacity-90 transition-opacity">
                    <div className="relative h-20 w-40">
                        <Image
                            src="/logo.png"
                            alt="Shiksha Library Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col justify-center leading-tight hidden sm:flex">
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            Shiksha Library
                        </span>
                        <span className="text-sm font-medium text-slate-600">
                            (An Innovative Classes)
                        </span>
                    </div>
                </Link>
            </div>
        </header>
    );
}

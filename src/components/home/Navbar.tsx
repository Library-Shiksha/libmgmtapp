import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface NavItem {
    title: string;
    href: string;
    children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Library", href: "/library" },
    { title: "Coaching Centre", href: "/coaching-centre" },
    { title: "Expert Faculty", href: "/coaching-centre/faculty" },
    { title: "Training Classes", href: "/training" },
    { title: "Syllabus", href: "/syllabus" },
    { title: "NCERT Books", href: "/ncert-books" },
    { title: "Question Paper", href: "/papers" },
];

export function Navbar() {
    return (
        <nav className="w-full bg-gray-100/95 backdrop-blur-sm border-b shadow-sm sticky top-24 z-40">
            <div className="container mx-auto px-4">
                <ul className="flex flex-wrap justify-center gap-6 py-3 text-sm font-medium text-gray-700">
                    {navItems.map((item) => (
                        <li key={item.title}>
                            {item.children ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-200 outline-none">
                                        {item.title}
                                        <ChevronDown className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {item.children.map((child) => (
                                            <DropdownMenuItem key={child.title} asChild>
                                                <Link href={child.href} className="w-full cursor-pointer">
                                                    {child.title}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-200"
                                >
                                    {item.title}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

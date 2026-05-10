import Link from "next/link";

export function Navbar() {
    return (
        <nav className="fixed top-0 inset-x-0 z-50 bg-[#131318]/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(124,58,237,0.06)]">
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-black gradient-text tracking-tighter select-none"
                >
                    NECROLOTO
                </Link>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { label: "Comment ça marche", href: "/#comment-ca-marche" },
                        { label: "Classement", href: "/#classement" }
                    ].map(({ label, href }) => (
                        <a
                            key={href}
                            href={href}
                            className="text-xs font-bold uppercase tracking-widest text-[#ccc3d8] hover:text-white transition-colors"
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Auth buttons */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/sign-in"
                        className="hidden sm:inline-flex px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#ccc3d8] hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                    >
                        Se connecter
                    </Link>
                    <Link
                        href="/sign-up"
                        className="inline-flex px-5 py-2 text-xs font-bold uppercase tracking-widest text-white gradient-bg rounded-lg hover:opacity-90 active:scale-95 transition-all"
                    >
                        Rejoindre
                    </Link>
                </div>
            </div>
        </nav>
    );
}

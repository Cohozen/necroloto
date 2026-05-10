"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { IconGroups } from "@/components/icons/IconGroups";
import { IconBolt } from "@/components/icons/IconBolt";
import { IconTrophy } from "@/components/icons/IconTrophy";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IndexPage() {
    return (
        <div className="relative min-h-screen bg-[#131318] text-[#e4e1e9] font-sans overflow-x-hidden">
            {/* ── Navbar ── */}
            <Navbar />

            {/* ── Main ── */}
            <main className="relative pt-24">
                {/* Background grid texture */}
                <div className="absolute inset-0 grid-texture pointer-events-none" />
                {/* Ambient purple glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-[#7c3aed]/10 rounded-full blur-[160px] pointer-events-none" />

                {/* ── Hero ── */}
                <section className="relative max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — copy */}
                    <div className="relative z-10">
                        {/* Live badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2a292f] border border-white/10 mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse shadow-[0_0_8px_#4cd7f6]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ccc3d8]">
                                Saison 2026 en cours
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-[3.5rem] md:text-[5rem] font-black leading-[0.9] tracking-tighter text-white mb-6">
                            La
                            <br />
                            compétition
                            <br />
                            <span className="gradient-text">stratégique</span> feutrée.
                        </h1>

                        {/* Sub-copy */}
                        <p className="text-lg md:text-xl text-[#ccc3d8] max-w-lg mb-12 leading-relaxed">
                            Formez vos cercles. Faites vos prédictions.
                            <br />
                            Gravez votre nom dans l&apos;éternité numérique.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/sign-up"
                                className="inline-flex items-center px-8 py-4 gradient-bg text-white text-sm font-bold uppercase tracking-widest rounded-xl shadow-[0_20px_40px_rgba(124,58,237,0.25)] hover:scale-105 transition-transform"
                            >
                                Commencer gratuitement
                            </Link>
                        </div>
                    </div>

                    {/* Right — glassmorphic preview card */}
                    <div className="relative min-h-[420px] flex items-center justify-center">
                        {/* Glow blobs */}
                        <div className="absolute w-[500px] h-[500px] bg-[#7c3aed]/20 rounded-full blur-[100px] -top-16 -right-16 pointer-events-none" />
                        <div className="absolute w-[350px] h-[350px] bg-[#ec4899]/10 rounded-full blur-[80px] bottom-0 left-0 pointer-events-none" />

                        {/* Card */}
                        <div className="relative glass-card neon-aura p-8 rounded-[2.5rem] w-full max-w-sm rotate-3 hover:rotate-0 transition-transform duration-700 overflow-hidden">
                            {/* Inner glow accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7c3aed]/30 to-transparent blur-2xl pointer-events-none" />

                            {/* Card header */}
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c3aed] mb-1">
                                        Cercle Élite
                                    </p>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">
                                        Les Visionnaires
                                    </h3>
                                </div>

                                {/* Avatar stack */}
                                <div className="flex -space-x-2.5">
                                    {["JD", "ML"].map((initials) => (
                                        <div
                                            key={initials}
                                            className="w-9 h-9 rounded-full border-2 border-[#2a292f] bg-[#1b1b20] flex items-center justify-center text-[10px] font-bold text-[#ccc3d8]"
                                        >
                                            {initials}
                                        </div>
                                    ))}
                                    <div className="w-9 h-9 rounded-full border-2 border-[#2a292f] bg-[#1b1b20] flex items-center justify-center text-[10px] font-bold text-[#ccc3d8]">
                                        +12
                                    </div>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="space-y-3">
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 gradient-bg rounded-full" />
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-[#ccc3d8]">Progression Saison</span>
                                    <span className="text-white">67%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Social proof bar ── */}
                <section className="relative max-w-7xl mx-auto px-6 md:px-8 mt-8 md:mt-16">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-16 py-10 px-8 rounded-3xl bg-[#1b1b20] border border-white/5">
                        {[
                            { value: "2 400", label: "Joueurs\nActifs" },
                            { value: "2026", label: "Saison\nEn cours" },
                            { value: "147", label: "Cercles\nActifs" }
                        ].map(({ value, label }, i) => (
                            <div key={value} className="flex items-center gap-4">
                                {i > 0 && (
                                    <div className="hidden md:block w-px h-10 bg-white/10 -ml-8 md:-ml-8 mr-0" />
                                )}
                                <span className="text-3xl font-black text-white">{value}</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccc3d8] leading-tight whitespace-pre-line">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── How it works ── */}
                <section
                    id="comment-ca-marche"
                    className="relative max-w-7xl mx-auto px-6 md:px-8 mt-32 md:mt-48"
                >
                    {/* Section header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div>
                            <p className="text-[#06b6d4] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                                Le Protocole
                            </p>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                                Comment ça marche
                            </h2>
                        </div>
                        <p className="text-[#ccc3d8] max-w-xs leading-relaxed">
                            Une mécanique précise pour une expérience de prédiction haut de gamme.
                        </p>
                    </div>

                    {/* Steps grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <IconGroups />,
                                gradient: "from-[#7c3aed] to-[#ec4899]",
                                title: "Créez ou rejoignez un cercle",
                                body: "Invitez vos alliés ou intégrez une confrérie existante pour entamer la compétition.",
                                step: "01"
                            },
                            {
                                icon: <IconBolt />,
                                gradient: "from-[#06b6d4] to-[#7c3aed]",
                                title: "Faites vos prédictions",
                                body: "Analysez l'actualité et misez sur les trajectoires des personnalités publiques.",
                                step: "02"
                            },
                            {
                                icon: <IconTrophy />,
                                gradient: "from-[#ec4899] to-[#06b6d4]",
                                title: "Gagnez des points",
                                body: "Chaque succès vous propulse au sommet du classement mondial et de votre cercle.",
                                step: "03"
                            }
                        ].map(({ icon, gradient, title, body, step }) => (
                            <div
                                key={step}
                                className="group relative p-10 rounded-[2rem] glass-card transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.08] overflow-hidden"
                            >
                                {/* Icon */}
                                <div
                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-8 shadow-lg`}
                                >
                                    {icon}
                                </div>

                                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                                <p className="text-[#ccc3d8] leading-relaxed text-sm">{body}</p>

                                {/* Ghost step number */}
                                <div className="absolute bottom-5 right-7 text-[4rem] font-black text-white/[0.04] select-none leading-none">
                                    {step}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Leaderboard preview + CTA ── */}
                <section
                    id="classement"
                    className="relative max-w-7xl mx-auto px-6 md:px-8 mt-32 md:mt-48 pb-32"
                >
                    {/* Blurred skeleton preview */}
                    <div className="relative glass-card rounded-[3rem] overflow-hidden blur-sm opacity-40 select-none pointer-events-none">
                        <div className="p-10 md:p-12">
                            <div className="flex justify-between items-center mb-10">
                                <div className="h-7 w-48 bg-white/10 rounded-lg" />
                                <div className="h-7 w-32 bg-white/10 rounded-lg" />
                            </div>
                            <div className="space-y-4">
                                {[32, 40, 24].map((w) => (
                                    <div
                                        key={w}
                                        className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white/20 shrink-0" />
                                        <div
                                            className="h-4 bg-white/10 rounded-md"
                                            style={{ width: `${w * 4}px` }}
                                        />
                                        <div className="ml-auto h-4 w-14 bg-white/10 rounded-md shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Fade gradient over the skeleton */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#131318]/85 to-[#131318] pointer-events-none rounded-[3rem]" />

                    {/* CTA overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
                            L&apos;élite vous attend
                        </h2>
                        <p className="text-lg text-[#ccc3d8] mb-10 max-w-md leading-relaxed">
                            Accédez aux statistiques détaillées et au classement mondial en temps
                            réel.
                        </p>
                        <Link
                            href="/sign-up"
                            className="inline-flex items-center px-10 py-4 bg-white text-[#131318] text-sm font-bold uppercase tracking-[0.15em] rounded-2xl shadow-2xl hover:bg-[#06b6d4] hover:text-white transition-all"
                        >
                            Rejoindre pour voir le classement complet
                        </Link>
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer className="bg-[#0e0e13] border-t border-white/10 py-10 px-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <span className="text-[11px] uppercase tracking-[0.06em] text-[#ccc3d8]">
                    © 2026 NECROLOTO. L&apos;éternité par la stratégie.
                </span>
                <div className="flex gap-8">
                    {["Conditions", "Confidentialité", "Aide", "Contact"].map((label) => (
                        <a
                            key={label}
                            href="#"
                            className="text-[11px] uppercase tracking-[0.06em] text-[#ccc3d8] hover:text-[#06b6d4] transition-colors"
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </footer>
        </div>
    );
}

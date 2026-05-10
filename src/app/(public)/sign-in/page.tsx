"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import Link from "next/link";
import { IconEye } from "@/components/icons/IconEye";
import { IconGoogle } from "@/components/icons/IconGoogle";
import { IconArrowRight } from "@/components/icons/IconArrowRight";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SignInPage() {
    const { signIn, fetchStatus } = useSignIn();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        setError("");

        const { error } = await signIn.password({ identifier: email, password });
        if (error) {
            setError(error.message);
            return;
        }

        if (signIn.status === "complete") {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        // Handle pending session tasks
                        // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
                        console.log(session?.currentTask);
                        return;
                    }

                    const url = decorateUrl("/");
                    if (url.startsWith("http")) {
                        window.location.href = url;
                    } else {
                        router.push(url);
                    }
                }
            });
        }
    };

    const handleOAuth = (strategy: "oauth_google") => {
        if (!signIn) return;
        signIn.sso({
            strategy,
            redirectCallbackUrl: "/sso-callback",
            redirectUrl: "/overview"
        });
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-[#131318] text-[#e4e1e9] font-sans overflow-x-hidden">
            {/* ── Background decoration ── */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#7c3aed]/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#ec4899]/8 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[15%] w-24 h-24 bg-[#4cd7f6]/5 rounded-full blur-[40px]" />
                <div className="absolute inset-0 grid-texture opacity-50" />
            </div>

            {/* ── Header ── */}
            <header className="fixed top-0 inset-x-0 z-50">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 h-16.5 flex justify-between items-center">
                    {" "}
                    <Link
                        href="/"
                        className="text-xl font-black tracking-tighter gradient-text select-none"
                    >
                        NECROLOTO
                    </Link>
                </div>
            </header>

            {/* ── Main ── */}
            <main className="flex-1 flex items-center justify-center px-6 py-12 pt-32">
                <div className="glass-card neon-aura w-full max-w-[480px] rounded-2xl p-10 flex flex-col gap-8">
                    {/* Title */}
                    <div className="space-y-2">
                        <h1 className="text-[3.5rem] font-black tracking-tight text-white leading-tight">
                            Bon retour.
                        </h1>
                        <p className="text-[#ccc3d8] text-base">
                            Connectez-vous pour accéder à vos cercles.
                        </p>
                    </div>

                    {/* Form */}
                    <form action={handleSubmit} className="flex flex-col gap-6">
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-[10px] font-bold uppercase tracking-widest text-[#ccc3d8] ml-1"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="nom@exemple.com"
                                required
                                className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-[#e4e1e9] placeholder:text-[#958da1] outline-none focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/10 transition-all duration-200"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-end">
                                <label
                                    htmlFor="password"
                                    className="text-[10px] font-bold uppercase tracking-widest text-[#ccc3d8] ml-1"
                                >
                                    Mot de passe
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-medium text-[#4cd7f6] hover:opacity-75 transition-opacity"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 pr-12 text-[#e4e1e9] placeholder:text-[#958da1] outline-none focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/10 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ccc3d8] hover:text-white transition-colors"
                                    aria-label={
                                        showPassword
                                            ? "Masquer le mot de passe"
                                            : "Afficher le mot de passe"
                                    }
                                >
                                    <IconEye open={showPassword} />
                                </button>
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            isDisabled={!signIn || fetchStatus === "fetching"}
                            isPending={fetchStatus === "fetching"}
                            fullWidth
                            className="py-4 gradient-bg text-white font-bold uppercase tracking-widest text-sm rounded-lg shadow-xl hover:scale-[0.98] active:scale-[0.95] transition-all duration-200 disabled:opacity-60"
                        >
                            {fetchStatus === "fetching" ? "Connexion…" : "Se connecter"}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5" />
                        </div>
                        <span className="relative px-4 bg-[#1b1b20]/50 text-[10px] uppercase tracking-[0.2em] font-bold text-[#958da1]">
                            ou
                        </span>
                    </div>

                    {/* OAuth buttons */}
                    <div className="flex flex-col gap-3">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => handleOAuth("oauth_google")}
                            className="group flex items-center justify-center gap-3 w-full py-3 px-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-200"
                        >
                            <span className="grayscale group-hover:grayscale-0 transition-all duration-200">
                                <IconGoogle />
                            </span>
                            <span className="text-xs font-medium uppercase tracking-wider text-[#e4e1e9]">
                                Continuer avec Google
                            </span>
                        </Button>
                    </div>

                    {/* Sign-up link */}
                    <div className="text-center">
                        <Link
                            href="/sign-up"
                            className="inline-flex items-center gap-2 text-sm font-bold gradient-text hover:opacity-80 transition-opacity"
                        >
                            Pas encore de compte ? Rejoindre Necroloto
                            <IconArrowRight />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

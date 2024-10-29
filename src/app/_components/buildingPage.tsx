"use client";

import Link from "next/link";

export default function BuildingPage() {
    return (
        <div className="p-4 md:p-10 mx-auto max-w-7xl prose">
            <h1>Page en cours de construction</h1>
            <p>Reviens plus tard !</p>
            <Link href={`/home`} className="btn btn-outline btn-primary">
                {"Retour à l'accueil"}
            </Link>
        </div>
    )
}
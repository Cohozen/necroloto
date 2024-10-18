import React from "react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { ArrowRight } from "@/ui/icons/ArrowRightIcon";
import Rules from "./Rules";

export default function IndexPage() {
    return (
        <div className="relative overflow-hidden h-[100dvh] light bg-background">
            <div className="relative">
                <div className="max-w-2xl mx-auto text-center pt-64">
                    <div className="flex flex-col relative">
                        <h1 className="text-7xl font-semibold mb-4 relative tracking-tight text-default-900">
                            Necroloto
                        </h1>
                        <p className="text-xl text-default-300">
                            {"Défiez le destin, anticipez l'avenir !"}
                        </p>
                    </div>
                    <div className="flex gap-4 justify-center mt-6">
                        <Button as={Link} href="/sign-up" radius="full" variant="bordered">
                            {"S'inscrire"}
                        </Button>
                        <Button
                            as={Link}
                            href="/sign-in"
                            radius="full"
                            variant="light"
                            endContent={<ArrowRight className="w-5 h-5" />}
                        >
                            {"Connexion"}
                        </Button>
                    </div>
                </div>
                <Rules />
            </div>
        </div>
    );
}

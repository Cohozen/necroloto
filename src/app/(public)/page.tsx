import React from "react";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";

import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { ArrowRight } from "@/ui/icons/ArrowRightIcon";
import Rules from "./Rules";

export default function IndexPage() {
    return (
        <div className="relative">
            <div className="max-w-2xl mx-auto text-center pt-20 lg:pt-36">
                <div className="flex flex-col relative items-center">
                    <Image
                        as={NextImage}
                        src="/logo.jpeg"
                        width={400}
                        height={400}
                        alt="Necroloto logo"
                        className="z-0"
                    />
                    <p className="text-lg text-default-300">
                        {"Défiez le destin, anticipez l'avenir !"}
                    </p>
                </div>
                <div className="flex gap-4 justify-center mt-10">
                    <Button as={Link} href="/sign-up" radius="full" variant="bordered" size="lg">
                        {"S'inscrire"}
                    </Button>
                    <Button
                        as={Link}
                        href="/sign-in"
                        radius="full"
                        size="lg"
                        variant="faded"
                        endContent={<ArrowRight className="w-5 h-5" />}
                    >
                        {"Connexion"}
                    </Button>
                </div>
            </div>
            <Rules />
        </div>
    );
}

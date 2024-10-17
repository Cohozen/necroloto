"use client";

import React from "react";
import { Celebrity } from "@prisma/client";
import dayjs from "dayjs";
import { calculPointByCelebrity } from "@/lib/helpers/bet";
import { Card, Button, CardHeader, CardFooter, Image, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface CelebrityCardProps {
    celebrity: Celebrity;
}

export default function CelebrityCard({ celebrity }: CelebrityCardProps) {
    const router = useRouter();

    const old = dayjs(celebrity.death || new Date()).diff(celebrity?.birth, "year");

    const celebrityPts = celebrity.birth
        ? calculPointByCelebrity(celebrity.birth, celebrity.death ?? new Date())
        : null;

    return (
        <Card
            isFooterBlurred
            className="h-[220px]"
            isPressable
            onPress={() => router.push(`/celebrities/${celebrity.id}`)}
        >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <Chip
                    className="capitalize"
                    color={celebrity.death ? "danger" : "success"}
                    size="sm"
                    variant="solid"
                >
                    {celebrity.death ? "Décédé" : "En vie"}
                </Chip>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={celebrity.photo ?? ""}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div className="flex flex-col items-start">
                    <p className="text-black text-tiny font-bold">{celebrity.name}</p>
                    <p className="text-black text-tiny">{old ? `${old} ans` : "-"}</p>
                </div>
            </CardFooter>
        </Card>
    );
}

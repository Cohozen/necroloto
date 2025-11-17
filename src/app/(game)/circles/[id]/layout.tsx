import React from "react";
import CircleNav from "@/components/business/circle/CircleNav";
import { currentUser } from "@clerk/nextjs/server";
import { listCirclesByUser } from "@/lib/api/circle";
import { Circle } from "@prisma/client";

export default async function CircleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const user = await currentUser();
    let myCircles: Circle[] = [];

    if (user?.externalId) {
        myCircles = await listCirclesByUser(user?.externalId);
    }

    return (
        <>
            <nav className="sticky top-0 z-50 bg-default-100/50 border-small border-default-200/20 shadow-medium backdrop-blur-md backdrop-saturate-150">
                <CircleNav circleId={params.id} myCircles={myCircles} />
            </nav>
            {children}
        </>
    );
}

import React from "react";
import { getCircle } from "@/lib/api/circle";
import SettingsForm from "./settingsForm";
import { currentUser } from "@clerk/nextjs/server";
import { getMembershipsByCircle } from "@/lib/api/membership";

export default async function SettingsPage({ params }: { params: { id: string } }) {
    const user = await currentUser();

    if (!user) throw new Error("User not found");

    const circleId = params.id;
    const circle = await getCircle(circleId);
    if (!circle) throw new Error(`Circle with id ${circleId} not found`);

    const member = await getMembershipsByCircle(circleId, user.externalId);
    if (member.length === 0) throw new Error("User is not member of this circle");

    return (
        <div className="p-2">
            <SettingsForm circle={circle} isAdmin={member[0].role === "ADMIN"} />
        </div>
    );
}

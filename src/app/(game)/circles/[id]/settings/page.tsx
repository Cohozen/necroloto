import React from "react";
import { getCircle } from "@/lib/api/circle";
import SettingsForm from "./settingsForm";

export default async function SettingsPage({ params }: { params: { id: string } }) {
    const circleId = params.id;
    const circle = await getCircle(circleId);

    if (!circle) throw new Error(`Circle with id ${circleId} not found`);

    return (
        <div className="p-2">
            <SettingsForm circle={circle} />
        </div>
    );
}

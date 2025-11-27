import { currentUser } from "@clerk/nextjs/server";
import { listCirclesByUser } from "@/lib/api/circle";
import { redirect } from "next/navigation";
import { Circle } from "@prisma/client";

export default async function CirclesPage() {
    const user = await currentUser();

    let myCircles: Circle[] = [];
    if (user?.externalId) myCircles = await listCirclesByUser(user?.externalId);

    if (myCircles.length) redirect(`/circles/${myCircles[0].id}`);

    // TODO Return to create circle
    return <div>CirclesPage</div>;
}

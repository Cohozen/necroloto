"use server";

import { Circle } from "@prisma/client";
import { getCircle, listCirclesByUser, updateCircle } from "@/lib/api/circle";
import { revalidatePath } from "next/cache";

export async function updateCircleAction(circleId: string, allowNewBet: boolean) {
    const circle = await getCircle(circleId);

    if (!circle) throw new Error(`Circle with id ${circleId} not found`);

    const circleToUpdate: Circle = {
        id: circleId,
        name: circle.name,
        status: circle.status,
        code: circle.code,
        visibility: circle.visibility,
        createdAt: circle.createdAt,
        updatedAt: new Date(),
        allowNewBet
    };

    await updateCircle(circleToUpdate);

    revalidatePath("/circles");
}

export async function listCirclesByUserAction(circleId: string) {
    return listCirclesByUser(circleId);
}

"use server";

import { mergeCelebrity, updateCelebrity, updatePointsCelebrityOnBets } from "@/lib/api/celebrity";
import { Celebrity } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { calculPointByCelebrity } from "@/lib/helpers/bet";

export async function updateCelebrityAction(
    celebrityId: string,
    name: string,
    birth: string | null,
    death: string | null,
    photo: string | null
) {
    const newBirth = birth ? new Date(birth) : null;
    const newDeath = death ? new Date(death) : null;

    const celebrity: Celebrity = {
        id: celebrityId,
        name,
        photo,
        birth: newBirth,
        death: newDeath
    };

    if (newBirth && newDeath) {
        const yearOfDeath = newDeath.getFullYear();
        const points = calculPointByCelebrity(newBirth, newDeath);
        await updatePointsCelebrityOnBets(celebrityId, points, yearOfDeath);
    }

    await updateCelebrity(celebrity);

    revalidatePath(`/celebrities/${celebrityId}`);
}

export async function mergeCelebrityAction(celebrityFromId: string, celebrityToId: string) {
    await mergeCelebrity(celebrityFromId, celebrityToId);

    revalidatePath(`/celebrities/${celebrityToId}`);
    revalidatePath("/bets");
}

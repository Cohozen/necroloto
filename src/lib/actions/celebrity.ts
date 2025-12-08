"use server";

import { mergeCelebrity, updateCelebrity, updatePointsCelebrityOnBets } from "@/lib/api/celebrity";
import { Celebrity } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { calculPointByCelebrity } from "@/lib/helpers/bet";
import { createClient } from "@supabase/supabase-js";

export async function updateCelebrityAction(
    celebrityId: string,
    name: string,
    birth: string | null,
    death: string | null,
    formData: FormData | null = null
) {
    const newBirth = birth ? new Date(birth) : null;
    const newDeath = death ? new Date(death) : null;

    const celebrity: Celebrity = {
        id: celebrityId,
        name,
        photo: null,
        birth: newBirth,
        death: newDeath
    };

    if (newBirth && newDeath) {
        const yearOfDeath = newDeath.getFullYear();
        const points = calculPointByCelebrity(newBirth, newDeath);
        await updatePointsCelebrityOnBets(celebrityId, points, yearOfDeath);
    }

    await updateCelebrity(celebrity);

    if (formData && process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
        const file = formData.get("file") as File;

        if (file && file.size > 0) {
            const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
            const filePath = `celebrities/${celebrityId}`;

            const { error: uploadError } = await supabase.storage
                .from("images")
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false
                });

            if (uploadError) {
                console.log(
                    `[UPDATE CELEBRITY] Image upload error : ${celebrityId} - ${uploadError.message}`
                );
            }
        }
    }

    revalidatePath(`/celebrities/${celebrityId}`);
}

export async function mergeCelebrityAction(celebrityFromId: string, celebrityToId: string) {
    await mergeCelebrity(celebrityFromId, celebrityToId);

    revalidatePath(`/celebrities/${celebrityToId}`);
    revalidatePath("/bets");
}

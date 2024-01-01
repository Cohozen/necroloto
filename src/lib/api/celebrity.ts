import { Celebrity } from "@prisma/client";
import prisma from "@/lib/prisma";

type CreatedCelebrity = Pick<Celebrity, "name" | "birth" | "death" | "photo">;

export async function listIncompleteCelebrities() {
    return prisma.celebrity.findMany({
        where: {
            OR: [{ birth: null }, { death: null }]
        }
    });
}

export async function insertCelebrity(celebrity: CreatedCelebrity) {
    return prisma.celebrity.create({
        data: {
            name: celebrity.name,
            birth: celebrity.birth,
            death: celebrity.death,
            photo: celebrity.photo
        }
    });
}

export async function updateCelebrity(celebrity: Celebrity) {
    return prisma.celebrity.update({
        where: { id: celebrity.id },
        data: {
            birth: celebrity.birth,
            death: celebrity.death,
            photo: celebrity.photo
        }
    });
}

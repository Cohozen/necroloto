import { PrismaClient, Celebrity } from "@prisma/client";

type CreatedCelebrity = Pick<Celebrity, "name" | "birth" | "death" | "photo">;

export async function insertCelebrity(celebrity: CreatedCelebrity) {
    const prisma = new PrismaClient();

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
    const prisma = new PrismaClient();

    return prisma.celebrity.update({
        where: { id: celebrity.id },
        data: {
            birth: celebrity.birth,
            death: celebrity.death,
            photo: celebrity.photo
        }
    });
}

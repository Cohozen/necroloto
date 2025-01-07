import { Celebrity } from "@prisma/client";
import prisma from "@/lib/prisma";
import { unstable_cache, revalidateTag } from "next/cache";

type CreatedCelebrity = Pick<Celebrity, "name" | "birth" | "death" | "photo">;

export const listAllCelebrities = unstable_cache(
    async () => {
        return prisma.celebrity.findMany();
    },
    ["all-celebrities"],
    { tags: ["celebrities"] }
);

export const SearchCelebrities = unstable_cache(
    async (name: string, living: boolean, deceased: boolean) => {
        return prisma.celebrity.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive"
                },
                OR: [
                    ...(living ? [{ death: null }] : []),
                    ...(deceased ? [{ death: { not: null } }] : [])
                ]
            }
        });
    },
    ["search-celebrities"],
    { tags: ["celebrities"] }
);

export const getCelebrity = unstable_cache(
    async (id: string) => {
        return prisma.celebrity.findUnique({
            where: {
                id
            }
        });
    },
    ["celebrity"],
    { tags: ["celebrities"] }
);

export const insertCelebrity = async (celebrity: CreatedCelebrity) => {
    const result = prisma.celebrity.create({
        data: {
            name: celebrity.name,
            birth: celebrity.birth,
            death: celebrity.death,
            photo: celebrity.photo
        }
    });

    revalidateTag("celebrities");

    return result;
};

export const updateCelebrity = async (celebrity: Celebrity) => {
    const result = prisma.celebrity.update({
        where: { id: celebrity.id },
        data: {
            name: celebrity.name,
            birth: celebrity.birth,
            death: celebrity.death,
            photo: celebrity.photo
        }
    });

    revalidateTag("celebrities");

    return result;
};

export async function updatePointsCelebrityOnBets(
    celebrityId: string,
    points: number,
    year: number
) {
    return prisma.celebritiesOnBet.updateMany({
        where: { celebrityId: celebrityId, bet: { year: year } },
        data: {
            points
        }
    });
}

export const mergeCelebrity = async (fromId: string, toId: string) => {
    const result = prisma.$transaction(
        async (tx) => {
            await tx.celebrity.findUniqueOrThrow({
                where: {
                    id: fromId,
                    death: null
                },
                include: {
                    CelebritiesOnBet: true
                }
            });

            await tx.celebrity.findUniqueOrThrow({
                where: {
                    id: toId
                }
            });

            await tx.celebritiesOnBet.updateMany({
                where: { celebrityId: fromId },
                data: {
                    celebrityId: toId
                }
            });

            return tx.celebrity.delete({
                where: { id: fromId }
            });
        },
        { timeout: 30000 }
    );

    revalidateTag("celebrities");

    return result;
};

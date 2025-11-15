import { revalidateTag, unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { Circle } from "@prisma/client";

type CreatedCircle = Pick<Circle, "name" | "visibility">;

const generateCircleCode = (length: number = 8): string => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += letters[Math.floor(Math.random() * letters.length)];
    }
    return code;
};

export const getCircle = unstable_cache(
    async (id: string) => {
        return prisma.circle.findUnique({
            where: {
                id
            }
        });
    },
    ["circle-by-id"],
    { tags: ["circles"] }
);

export const listCirclesByUser = unstable_cache(
    async (userId: string) => {
        return prisma.circle.findMany({
            where: {
                memberships: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                memberships: true
            }
        });
    },
    ["circles-by-user-with-memberships"],
    { tags: ["circles", "memberships"] }
);

export const insertCircle = async (circle: CreatedCircle) => {
    const result = prisma.circle.create({
        data: {
            name: circle.name,
            visibility: circle.visibility,
            code: generateCircleCode(8),
            status: "OPEN",
            allowNewBet: false
        }
    });

    revalidateTag("circles");

    return result;
};

export const updateCircle = async (circle: Circle) => {
    const result = prisma.circle.update({
        where: { id: circle.id },
        data: {
            name: circle.name,
            status: circle.status
        }
    });

    revalidateTag("celebrities");

    return result;
};

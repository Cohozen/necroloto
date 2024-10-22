import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";

type CreatedUser = Pick<
    User,
    "clerkId" | "email" | "image" | "username" | "firstname" | "lastname"
>;

export const findUserByClerkId = unstable_cache(
    async (clerkId: string) => {
        return prisma.user.findFirst({
            where: {
                clerkId
            }
        });
    },
    ["user-by-id"],
    { tags: ["users"] }
);

export async function insertUser(user: CreatedUser) {
    const result = prisma.user.create({
        data: {
            clerkId: user.clerkId,
            email: user?.email,
            image: user.image,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        }
    });

    revalidateTag("users");

    return result;
}

export async function updateUser(user: User) {
    const result = prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            clerkId: user.clerkId,
            email: user?.email,
            image: user.image,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        }
    });

    revalidateTag("users");

    return result;
}

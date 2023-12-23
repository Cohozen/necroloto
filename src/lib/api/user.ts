import { PrismaClient, User } from "@prisma/client";

type CreatedUser = Pick<User, "clerkId" | "email" | "image" | "username" | "firstname" | "lastname">;

export async function findUserByClerkId(clerkId: string) {
    const prisma = new PrismaClient();

    return prisma.user.findFirst({
        where: {
            clerkId
        }
    });
}

export async function insertUser(user: CreatedUser) {
    const prisma = new PrismaClient();

    return prisma.user.create({
        data: {
            clerkId: user.clerkId,
            email: user?.email,
            image: user.image,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        }
    });
}

export async function updateUser(user: User) {
    const prisma = new PrismaClient();

    return prisma.user.update({
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
}

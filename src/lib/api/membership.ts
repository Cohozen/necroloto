import { revalidateTag, unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { Membership } from "@prisma/client";

type CreatedMembership = Pick<Membership, "circleId" | "userId">;

export const listMembershipsByCircle = unstable_cache(
    async (circleId: string) => {
        return prisma.membership.findMany({
            where: {
                circle: {
                    id: circleId
                }
            },
            include: {
                user: true
            }
        });
    },
    ["memberships-by-circle"],
    { tags: ["memberships", "circles"] }
);

export const insertMembership = async (membership: CreatedMembership) => {
    const result = prisma.membership.create({
        data: {
            circleId: membership.circleId,
            userId: membership.userId,
            role: "MEMBER"
        }
    });

    revalidateTag("memberships");
    revalidateTag("circles");

    return result;
};

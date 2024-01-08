import { User } from "@prisma/client";

export const buildUserName = (user: User): string => {
    if (!user?.firstname && !user?.lastname && user.email) return user.email;
    if (user?.firstname && !user?.lastname) return user.firstname;
    if (!user?.firstname && user?.lastname) return user.lastname;
    if (user?.firstname && user?.lastname) return `${user.firstname} ${user.lastname}`;
    return "";
};

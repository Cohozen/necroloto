"use client";

import { User } from "@prisma/client";
import Avatar from "@/components/ui/Avatar";

interface UserAvatarProps {
    user: User;
    size?: string;
    active?: boolean;
}

export default function UserAvatar({ user, size, active }: UserAvatarProps) {
    const placeholder = `${user.firstname && user.firstname.slice(0, 1)}${
        user.lastname && user.lastname.slice(0, 1)
    }`;

    return user.image ? (
        <Avatar size={size} image={user.image} ring={active ?? false} />
    ) : (
        <Avatar size={size} placeholder={placeholder} ring={active ?? false} />
    );
}

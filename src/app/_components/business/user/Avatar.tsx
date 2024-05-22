"use client";

import { User } from "@prisma/client";

interface AvatarProps {
    user: User;
    size?: string;
}

export default function Avatar({ user, size }: AvatarProps) {
    return user.image ? (
        <div className="avatar">
            <div className={`rounded-full ${size || "w-8"}`}>
                <img src={user.image} />
            </div>
        </div>
    ) : (
        <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
                <span className="text-xs">
                    {user.firstname && user.firstname.slice(0, 1)}
                    {user.lastname && user.lastname.slice(0, 1)}
                </span>
            </div>
        </div>
    );
}

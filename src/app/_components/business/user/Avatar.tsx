"use client";

import { User } from "@prisma/client";

interface AvatarProps {
    user: User;
}

export default function Avatar({ user }: AvatarProps) {
    const buildUserName = () => {
        if (!user.firstname && !user.lastname) return user.email;
        if (user.firstname && !user.lastname) return user.firstname;
        if (!user.firstname && user.lastname) return user.lastname;
        if (user.firstname && user.lastname) return `${user.firstname} ${user.lastname}`;
        return null;
    };

    return (
        <div className="tooltip" data-tip={buildUserName()}>
            {user.image ? (
                <div className="avatar">
                    <div className="w-8 rounded-full">
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
            )}
        </div>
    );
}

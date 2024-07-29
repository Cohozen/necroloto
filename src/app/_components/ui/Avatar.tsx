"use client";

interface AvatarProps {
    image?: string;
    size?: string;
    placeholder?: string;
    online?: boolean;
    offline?: boolean;
}

export default function Avatar({ image, size, placeholder, online, offline }: AvatarProps) {
    return (
        <div
            className={`avatar ${placeholder ? "placeholder" : ""} ${
                online ? "online" : offline ? "offline" : ""
            }`}
        >
            <div
                className={`rounded-full ${size || "w-8"} ${
                    placeholder ? "bg-neutral text-neutral-content" : ""
                }`}
            >
                {image && <img src={image} />}
                {placeholder && <span className="text-xs capitalize">{placeholder}</span>}
            </div>
        </div>
    );
}

"use client";

interface AvatarProps {
    image?: string;
    size?: string;
    placeholder?: string;
    online?: boolean;
    offline?: boolean;
    ring?: boolean;
    square?: boolean;
}

export default function Avatar({
    image,
    size,
    placeholder,
    online,
    offline,
    ring,
    square
}: AvatarProps) {
    return (
        <div
            className={`avatar ${placeholder ? "placeholder" : ""} ${
                online ? "online" : offline ? "offline" : ""
            }`}
        >
            <div
                className={`${square ? "rounded-xl" : "rounded-full"} ${size || "w-8"} ${
                    ring ? "ring-accent  ring-2" : ""
                } ${placeholder ? "bg-neutral text-neutral-content" : ""}`}
            >
                {image && <img src={image} />}
                {placeholder && <span className="text-xs capitalize">{placeholder}</span>}
            </div>
        </div>
    );
}

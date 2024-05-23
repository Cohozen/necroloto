"use client";

interface AvatarProps {
    image?: string;
    size?: string;
    placeholder?: string;
}

export default function Avatar({ image, size, placeholder }: AvatarProps) {
    return (
        <div className={`avatar ${placeholder ? "placeholder" : ""}`}>
            <div className={`rounded-full ${size || "w-8"} ${placeholder ? "bg-neutral text-neutral-content" : ""}`}>
                {image && <img src={image} />}
                {placeholder && <span className="text-xs">{placeholder}</span>}
            </div>
        </div>
    );
}

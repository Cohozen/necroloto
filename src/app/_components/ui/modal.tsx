"use client";

import { PropsWithChildren, useEffect } from "react";

type ModalProps = PropsWithChildren<{
    id: string;
    title: string;
    open: boolean;
    onClose: () => void;
}>;
export default function Modal({ id, title, open, onClose, children }: ModalProps) {
    useEffect(() => {
        // @ts-ignore
        if (open) document.getElementById(id)?.showModal();
    }, [open]);

    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">{title}</h3>
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>Fermer</button>
            </form>
        </dialog>
    );
}

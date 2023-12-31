"use client";

import { PropsWithChildren, useEffect } from "react";

type ModalProps = PropsWithChildren<{
    id: string;
    title: string;
    open: boolean;
}>;
export default function Modal({ id, title, open, children }: ModalProps) {
    useEffect(() => {
        // @ts-ignore
        document.getElementById(id)?.showModal();
    }, [open]);

    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">{title}</h3>
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Fermer</button>
            </form>
        </dialog>
    );
}

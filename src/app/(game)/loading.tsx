import { Spinner } from "@nextui-org/react";

export default async function Loading() {
    return (
        <main className="h-screen flex justify-center">
            <Spinner label="Chargement" color="primary" />
        </main>
    );
}

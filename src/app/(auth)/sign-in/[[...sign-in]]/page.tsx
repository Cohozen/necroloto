import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center">
            <SignIn />
        </main>
    );
}

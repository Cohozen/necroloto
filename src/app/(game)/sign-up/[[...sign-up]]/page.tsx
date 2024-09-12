import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center">
            <SignUp
                appearance={{
                    elements: {
                        card: "bg-base-100 border-base-300 shadow-none",
                        headerTitle: "text-base-content font-bold",
                        headerSubtitle: "text-base-content",
                        socialButtonsIconButton: "border-base-content hover:bg-base-200",
                        formFieldLabel: "text-base-content",
                        formFieldInput: "text-base-content bg-base-100 border-base-content",
                        formFieldHintText: "text-base-content text-xs italic",
                        formFieldInputShowPasswordButton:
                            "text-base-content hover:text-base-content/70",
                        formButtonPrimary:
                            "bg-primary hover:bg-primary/70 text-sm text-primary-content normal-case",
                        footerActionLink: "text-base-content font-bold",
                        footerActionText: "text-base-content",
                        dividerLine: "bg-base-content",
                        dividerText: "text-base-content",
                        socialButtonsBlockButton: "text-base-content"
                    }
                }}
            />
        </main>
    );
}

import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <main className="light h-screen flex items-center justify-center bg-background">
            <SignIn
                appearance={{
                    // elements: {
                    //     card: "bg-base-100 border-base-300 shadow-none",
                    //     headerTitle: "text-base-content font-bold",
                    //     headerSubtitle: "text-base-content",
                    //     socialButtonsIconButton: "border-base-content hover:bg-base-200",
                    //     formFieldLabel: "text-base-content",
                    //     formFieldInput: "text-base-content bg-base-100 border-base-content",
                    //     formFieldAction: "text-base-content italic text-xs",
                    //     formFieldInputShowPasswordButton:
                    //         "text-base-content hover:text-base-content/70",
                    //     formButtonPrimary:
                    //         "bg-primary hover:bg-primary/70 text-sm text-primary-content normal-case",
                    //     footerActionLink: "font-bold",
                    //     dividerLine: "bg-base-content",
                    //     dividerText: "text-base-content",
                    //     identityPreview: "border-base-content",
                    //     identityPreviewText: "text-base-content",
                    //     identityPreviewEditButtonIcon: "text-base-content",
                    //     socialButtonsBlockButton: "text-base-content"
                    // }
                }}
            />
        </main>
    );
}

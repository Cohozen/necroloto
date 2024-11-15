import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="dark h-screen flex items-center justify-center bg-background">
            <SignIn
                appearance={{
                    elements: {
                        card: "bg-background px-0 shadow-none",
                        footer: "bg-background no-bg clerk-footer",
                        cardBox: "!shadow-none",
                        headerTitle: "text-xl text-default-800 font-bold",
                        headerSubtitle: "text-default-500",
                        socialButtonsIconButton: "border-default-800 hover:bg-base-200",
                        socialButtonsBlockButton:
                            "inline-flex items-center justify-center box-border appearance-none !shadow-none select-none whitespace-nowrap font-normal overflow-hidden tap-highlight-transparent outline-none !border-medium px-4 min-w-20 h-10 !text-small gap-2 !rounded-full transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-primary text-primary",
                        formFieldLabel:
                            "pointer-events-none block text-foreground-500 will-change-auto motion-reduce:transition-none pb-0 z-20 start-3 end-auto text-small pe-2 max-w-full text-ellipsis overflow-hidden",
                        formFieldInput:
                            "relative w-full text-default-800 inline-flex !shadow-none tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 hover:bg-default-200 h-10 min-h-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none",
                        buttonArrowIcon: "hidden",
                        formFieldInputShowPasswordButton:
                            "text-default-800 hover:text-default-400 focus:border-0 focus:ring-0",
                        formButtonPrimary:
                            "inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal overflow-hidden tap-highlight-transparent outline-none px-4 min-w-20 h-10 text-small gap-2 rounded-full transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground hover:bg-primary hover:opacity-hover",
                        footerActionLink:
                            "text-default-800 font-bold hover:text-default-600 hover:no-underline",
                        footerActionText: "text-default-600",
                        dividerLine: "bg-default-600",
                        dividerText: "text-default-600"
                    }
                }}
            />
        </div>
    );
}

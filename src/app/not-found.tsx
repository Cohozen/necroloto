import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex-1 flex justify-center items-center">
            <div className="flex flex-col p-4 gap-4">
                <div className="flex flex-row gap-4 items-center">
                    <div className="text-4xl font-bold ">Page non trouvée</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 animate-spin">
                        <path fill="currentColor"
                              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10M6.76 8.82l1.06-1.06l1.06 1.06l1.06-1.06L11 8.82L9.94 9.88L11 10.94L9.94 12l-1.06-1.06L7.82 12l-1.06-1.06l1.06-1.06zm.13 8.68C7.69 15.46 9.67 14 12 14s4.31 1.46 5.11 3.5zm10.35-6.56L16.18 12l-1.06-1.06L14.06 12L13 10.94l1.06-1.06L13 8.82l1.06-1.06l1.06 1.06l1.06-1.06l1.06 1.06l-1.06 1.06z"></path>
                    </svg>

                </div>

                <span className="text-lg">{"La page demandé n'existe pas"}</span>

                <Link className="btn btn-primary" href="/">
                    {"Retour à l'appli"}
                </Link>
            </div>
        </main>
    );
}

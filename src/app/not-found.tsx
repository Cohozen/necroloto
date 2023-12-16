import Link from "next/link";

export default function NotFound() {
    return (
        <div className="p-4 md:p-10 mx-auto max-w-7xl prose">
            <h1>Not Found</h1>
            <p>Could not find requested resource.</p>
            <Link className="btn btn-outline btn-primary" href="/">
                Return Home
            </Link>
        </div>
    );
}

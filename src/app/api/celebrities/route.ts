import { listAllCelebrities, SearchCelebrities } from "@/lib/api/celebrity";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) return Response.json(await listAllCelebrities());

    return Response.json(await SearchCelebrities(name));
}

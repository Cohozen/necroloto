import { listAllCelebrities, SearchCelebrities } from "@/lib/api/celebrity";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const living = searchParams.get("living") as boolean | null;
    const deceased = searchParams.get("deceased") as boolean | null;

    //if (!name) return Response.json(await listAllCelebrities());

    return Response.json(await SearchCelebrities(name ?? "", living ?? true, deceased ?? true));
}

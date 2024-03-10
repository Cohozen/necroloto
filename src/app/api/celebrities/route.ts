import { listAllCelebrities } from "@/lib/api/celebrity";

export async function GET(request: Request) {
    const result = await listAllCelebrities();
    return Response.json(result);
}

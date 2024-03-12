import { mergeCelebrities } from "@/lib/api/celebrity";

export async function POST(request: Request, { params }: { params: { id: string; idTo: string } }) {
    const { id, idTo } = params;

    const result = await mergeCelebrities(id, idTo);
    return Response.json(result);
}

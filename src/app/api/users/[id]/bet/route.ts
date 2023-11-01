import { getBetByUser, insertBet } from "@/lib/api/bet";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const result = await getBetByUser(id);
    return Response.json(result);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const result = await insertBet(id, body);
    return Response.json(result);
}

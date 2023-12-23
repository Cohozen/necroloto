import { getBetByUserAndYear, insertBet, insertBetWithCelebrities } from "@/lib/api/bet";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const result = await getBetByUserAndYear(id, 2024);
    return Response.json(result);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();

    const newBet = {
        userId: id,
        year: body.year
    };

    const result = await insertBetWithCelebrities(newBet, body.celebrities);
    return Response.json(result);
}

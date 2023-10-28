import { getBetByUser } from "../../../../../lib/api/bet";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const result = await getBetByUser(id);
    return Response.json(result);
}

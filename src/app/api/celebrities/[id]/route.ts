import { updateCelebrity } from "@/lib/api/celebrity";
import { Celebrity } from "@prisma/client";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();

    const celebrity: Celebrity = {
        id,
        name: body.name,
        birth: body.birth,
        death: body.death,
        photo: body.photo
    };

    const result = await updateCelebrity(celebrity);
    return Response.json(result);
}

import { updateCelebrity, updatePointsCelebrityOnBets } from "@/lib/api/celebrity";
import { Celebrity } from "@prisma/client";
import { calculPointByCelebrity } from "@/lib/helpers/bet";

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

    // if (body.birth && body.death) {
    //     const points = calculPointByCelebrity(body.birth, body.death);
    //     await updatePointsCelebrityOnBets(id, points);
    // }

    //const updateResult = await updateCelebrity(celebrity);

    return Response.json("");
    //return Response.json(updateResult);
}

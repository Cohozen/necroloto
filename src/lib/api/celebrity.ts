import clientPromise from "../mongodb";
import { ObjectId } from "bson";

const _collectionName: string = "celebrities";

export interface Celebrity {
    _id?: ObjectId;
    name: string;
    birth?: string;
    death?: string;
    photo?: string;
}

export async function getCelebrity(id: string): Promise<Celebrity | null> {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    return await collection.findOne<Celebrity>({ _id: new ObjectId(id) }, {});
}

export async function listCelebrities(): Promise<Celebrity[] | null> {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    return await collection.find<Celebrity>({}, {}).toArray();
}

export async function insertCelebrity(celebrity: Celebrity) {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    return await collection.insertOne(celebrity, {});
}

export async function updateCelebrity(celebrity: Celebrity) {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    return await collection.updateOne({ _id: celebrity._id }, celebrity, {});
}

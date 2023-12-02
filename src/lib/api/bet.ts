import clientPromise from "../mongodb";
import { ObjectId } from "bson";

export interface CelebrityBet {
    name: string;
    birth?: string;
    death?: string;
    point?: number;
}

export interface Bet {
    _id?: ObjectId;
    userId: string;
    year: number;
    celebrities: CelebrityBet[];
    createdAt: string;
}

export async function getBet(id: string): Promise<Bet | null> {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection("bets");

    return await collection.findOne<Bet>({ id }, {});
}

export async function getBetByUser(userId: string): Promise<Bet | null> {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection("bets");

    return await collection.findOne<Bet>({ userId }, {});
}

export async function insertBet(userId: string, celebrities: CelebrityBet[]) {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection("bets");

    const newBet: Bet = {
        userId,
        celebrities,
        year: new Date().getFullYear(),
        createdAt: new Date().toDateString()
    };

    return await collection.insertOne(newBet, {});
}

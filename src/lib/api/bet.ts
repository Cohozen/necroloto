import clientPromise from "../mongodb";
import { ObjectId } from "bson";
import { User } from "@/lib/api/user";

const _collectionName: string = "bets";

export interface CelebrityBet {
    name: string;
    celebrityId?: string;
    birth?: string;
    death?: string;
    point?: number;
}

export interface Bet {
    _id?: ObjectId;
    userId: ObjectId;
    year: number;
    celebrities: CelebrityBet[];
    createdAt: string;
    user?: User;
}

export async function getBet(id: string): Promise<Bet | null> {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    return await collection.findOne<Bet>({ _id: new ObjectId(id) }, {});
}

export async function getBetByUser(userId: string, year?: number): Promise<Bet | null> {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    const filter = {
        userId: new ObjectId(userId),
        ...(year && {
            year
        })
    };

    return await collection.findOne<Bet>(filter, {});
}

export async function listBetByUser(userId: string, year?: number): Promise<Bet[] | null> {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    const filter = {
        userId: new ObjectId(userId),
        ...(year && {
            year
        })
    };

    return await collection.find<Bet>(filter, {}).toArray();
}

export async function insertBet(userId: string, celebrities: CelebrityBet[]) {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    const newBet: Bet = {
        userId: new ObjectId(userId),
        celebrities,
        year: new Date().getFullYear(),
        createdAt: new Date().toDateString()
    };

    return await collection.insertOne(newBet, {});
}

export async function updateBet(betId: string, celebrities: CelebrityBet[]) {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    const bet = await getBet(betId);
    if (bet) {
        const updatedBet = {
            ...bet,
            celebrities
        };

        return await collection.updateOne({ _id: new ObjectId(betId) }, updatedBet, {});
    }

    return await collection.updateOne({ _id: new ObjectId(betId) }, {}, {});
}

export async function listBetWithCelebritiesNotAttached(): Promise<Bet[] | null> {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    const pipeline = [
        {
            $match: {
                $or: [
                    {
                        "celebrities.celebrityId": {
                            $exists: false
                        }
                    },
                    {
                        "celebrities.celebrityId": null
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "result"
            }
        },
        {
            $addFields: {
                user: {
                    $first: "$result"
                }
            }
        },
        {
            $unset: "result"
        }
    ];

    return await collection.aggregate<Bet>(pipeline, {}).toArray();
}

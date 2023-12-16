import clientPromise from "../mongodb";
import { ObjectId } from "bson";

const _collectionName: string = "users";

export interface User {
    _id?: ObjectId;
    clerkId: string;
    email?: string;
    imageUrl?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    clerkCreatedAt?: number;
    clerkUpdatedAt?: number;
}

export async function getUser(clerkId: string): Promise<User | null> {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection("users");

    return await collection.findOne<User>({ clerkId }, {});
}

export async function insertUser(user: User) {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    return await collection.insertOne(user, {});
}

export async function updateUser(user: User) {
    const client = await clientPromise;
    const collection = client.db(process.env.MONGODB_DATABASE).collection(_collectionName);

    return await collection.updateOne(
        { _id: user._id },
        {
            $set: {
                email: user.email,
                imageUrl: user.imageUrl,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                clerkUpdatedAt: user.clerkUpdatedAt
            }
        }
    );
}

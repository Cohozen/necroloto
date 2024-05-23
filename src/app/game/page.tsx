import { currentUser, clerkClient } from "@clerk/nextjs";
import { findUserByClerkId, insertUser, updateUser } from "@/lib/api/user";
import { User } from "@prisma/client";
import { BetsWithCelebrities } from "@/lib/types/bet";
import { getBetByUserAndYear } from "@/lib/api/bet";
import UserAvatar from "@/components/business/user/UserAvatar";
import React from "react";
import Link from "next/link";

export const metadata = {
    title: "Necroloto | Dashboard"
};

export default async function IndexPage() {
    const user = await currentUser();

    let userDb: User | null = null;

    if (user) {
        userDb = await findUserByClerkId(user.id);

        if (!userDb) {
            const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId);

            const newUserDb: User = {
                id: "",
                clerkId: user.id,
                email: email?.emailAddress || null,
                image: user.imageUrl,
                username: user.username,
                firstname: user.firstName,
                lastname: user.lastName,
                clerkUpdatedAt: new Date(user.updatedAt),
                clerkCreatedAt: new Date(user.createdAt),
                updatedAt: new Date(),
                createdAt: new Date()
            };
            const insertResult = await insertUser(newUserDb);
            userDb = insertResult;
            await clerkClient.users.updateUser(user.id, { externalId: insertResult.id });
        } else {
            if (userDb.clerkUpdatedAt && new Date(user.updatedAt) > userDb.clerkUpdatedAt) {
                const userToUpdate = {
                    ...userDb,
                    image: user.imageUrl,
                    username: user.username,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    clerkUpdatedAt: new Date(user.updatedAt),
                    clerkCreatedAt: new Date(user.createdAt)
                };

                await updateUser(userToUpdate);
            }
        }
    }

    const buildUserName = () => {
        if (!user?.firstName && !user?.lastName) return user?.emailAddresses[0]?.emailAddress;
        if (user?.firstName && !user?.lastName) return user?.firstName;
        if (!user?.firstName && user?.lastName) return user?.lastName;
        if (user?.firstName && user?.lastName) return `${user?.firstName} ${user?.lastName}`;
        return null;
    };

    let myBet: BetsWithCelebrities | null = null;

    if (user && user?.externalId) {
        const result = await getBetByUserAndYear(user?.externalId, 2024);
        if (result) myBet = result;
    }

    const totalPoints = myBet?.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0);

    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col items-center">
                <div className="flex flex-col gap-8 p-4">
                    {userDb && (
                        <div className="flex flex-row gap-4 justify-center px-2 pt-4">
                            <UserAvatar user={userDb} size="w-20" />
                            <div className="flex flex-col justify-center">
                                <span className="text-2xl">{buildUserName()}</span>
                                <span className="text-sm">{userDb?.email}</span>
                            </div>
                        </div>
                    )}
                    {myBet && (
                        <div className="stats w-full justify-center stats-vertical lg:stats-horizontal bg-primary text-primary-content shadow-lg">
                            <div className="stat">
                                <div className="stat-figure text-primary-content">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="h-10 w-10 text-secondary/80"
                                    >
                                        <circle cx="11" cy="6" r="4" fill="currentColor"></circle>
                                        <path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            d="M14.513 21.487C15.025 22 15.85 22 17.5 22c1.65 0 2.475 0 2.987-.513C21 20.975 21 20.15 21 18.5c0-1.65 0-2.475-.513-2.987C19.975 15 19.15 15 17.5 15c-1.65 0-2.475 0-2.987.513C14 16.025 14 16.85 14 18.5c0 1.65 0 2.475.513 2.987m2.014-1.51C15.824 19.474 15 18.883 15 17.86c0-1.13 1.375-1.931 2.5-.845c1.125-1.087 2.5-.285 2.5.845c0 1.023-.825 1.614-1.527 2.117l-.213.154c-.26.19-.51.369-.76.369s-.5-.18-.76-.37z"
                                            clipRule="evenodd"
                                        ></path>
                                        <path
                                            fill="currentColor"
                                            d="M14.594 21.563a1.28 1.28 0 0 1-.081-.076C14 20.975 14 20.15 14 18.5c0-1.65 0-2.475.513-2.987C15.025 15 15.85 15 17.5 15h.43c-1.383-1.345-3.969-2.25-6.93-2.25c-4.418 0-8 2.015-8 4.5s0 4.5 8 4.5c1.443 0 2.625-.066 3.594-.187"
                                            opacity=".5"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="stat-title text-primary-content">Encore en vie</div>
                                <div className="stat-value">
                                    28 <span className="text-sm">célébrités</span>
                                </div>
                                <div className="stat-desc text-primary-content">
                                    18% de plus que la moyenne
                                </div>
                            </div>

                            <div className="stat border-t-primary-content">
                                <div className="stat-figure text-primary-content">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="h-10 w-10 text-secondary/80"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M11.146 3.023C11.526 2.34 11.716 2 12 2c.284 0 .474.34.854 1.023l.098.176c.108.194.162.29.246.354c.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532c.088.283-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354c-.032.104-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352c-.23.175-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.136-.399-.136c-.104 0-.202.046-.399.136l-.178.082c-.691.318-1.037.478-1.267.303c-.23-.174-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438c-.032-.103-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165c.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135c.084-.064.138-.16.246-.354zM13 10h-2c-1.414 0-2.121 0-2.56.44C8 10.878 8 11.585 8 13v9h8v-9c0-1.414 0-2.121-.44-2.56C15.122 10 14.415 10 13 10"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M7.56 19.44C7.122 19 6.415 19 5 19c-1.414 0-2.121 0-2.56.44C2 19.878 2 20.585 2 22h6c0-1.414 0-2.121-.44-2.56M16 19v3h6v-3c0-1.414 0-2.121-.44-2.56C21.122 16 20.415 16 19 16c-1.414 0-2.121 0-2.56.44C16 16.878 16 17.585 16 19"
                                            opacity=".5"
                                        />
                                    </svg>
                                </div>
                                <div className="stat-title text-primary-content">Score</div>
                                <div className="stat-value">
                                    {totalPoints} <span className="text-sm">points</span>
                                </div>
                                <div className="stat-desc text-primary-content">
                                    1er au classement
                                </div>
                            </div>
                        </div>
                    )}
                    {myBet ? (
                        <div role="alert" className="alert shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-6 w-6"
                            >
                                <path
                                    fill="currentColor"
                                    d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                                    opacity=".5"
                                ></path>
                                <path
                                    fill="currentColor"
                                    d="M12 17.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
                                ></path>
                            </svg>

                            <div>
                                <h3 className="font-bold">{"Vous avez déjà parier pour 2024"}</h3>
                                <div className="text-xs">
                                    {"Le parie pour l'année 2024 est déjà enregistré"}
                                </div>
                            </div>
                            <Link href={`/game/bets/${myBet.id}`}>
                                <button className="btn btn-sm">Voir le pari</button>
                            </Link>
                        </div>
                    ) : (
                        <div role="alert" className="alert shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-6 w-6"
                            >
                                <path
                                    fill="currentColor"
                                    d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
                                    opacity=".5"
                                ></path>
                                <path
                                    fill="currentColor"
                                    d="M12 17.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75M12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"
                                ></path>
                            </svg>

                            <div>
                                <h3 className="font-bold">Aucun pari pour 2024</h3>
                                <div className="text-xs">
                                    {"Vous pouvez parier dès maintenant pour l'année 2024"}
                                </div>
                            </div>
                            <Link href="/game/bet">
                                <button className="btn btn-sm">Parier</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

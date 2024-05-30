import React from "react";
import { BetsWithUserAndCelebritiesOnBet } from "@/lib/types/bet";
import { listBetsByYear } from "@/lib/api/bet";
import { head, last, sortBy } from "lodash";
import Link from "next/link";
import UserAvatar from "@/components/business/user/UserAvatar";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import dayjs from "dayjs";
import { buildUserName } from "@/lib/helpers/user";

export default async function Page() {
    const bets = await listBetsByYear(2024);

    const totals = bets?.map((b) => {
        const total = b.CelebritiesOnBet.reduce((acc, curr) => acc + curr.points, 0);
        return {
            ...b,
            total
        };
    });

    const ordered = sortBy(totals, (b) => b.total && b.user.firstname);

    return (
        <main className="flex-1 flex flex-col gap-8 overflow-auto">
            <div className="flex flex-col items-center gap-6 p-4">
                <div className="flex text-2xl font-bold">Classement 2024</div>
            </div>

            <div className="flex flex-row justify-center items-end">
                <div className="flex flex-col items-center gap-2">
                    {ordered[2]?.user && (
                        <Link href={`/game/bets/${ordered[2].id}`}>
                            <UserAvatar user={ordered[2].user} />
                        </Link>
                    )}
                    <div className="flex justify-center items-start py-4 bg-primary/40 h-16 w-20 rounded-tl-xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-8 h-8 text-orange-900/50 hover:animate-bounce"
                        >
                            <path
                                fill="currentColor"
                                d="M12.795 2h-2c-1.886 0-2.829 0-3.414.586c-.586.586-.586 1.528-.586 3.414v3.5h10V6c0-1.886 0-2.828-.586-3.414C15.623 2 14.681 2 12.795 2"
                                opacity=".5"
                            ></path>
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M13.23 5.783a3 3 0 0 0-2.872 0L5.564 8.397A3 3 0 0 0 4 11.031v4.938a3 3 0 0 0 1.564 2.634l4.794 2.614a3 3 0 0 0 2.872 0l4.795-2.614a3 3 0 0 0 1.564-2.634V11.03a3 3 0 0 0-1.564-2.634zM11.794 10.5c-.284 0-.474.34-.854 1.023l-.098.176c-.108.194-.162.29-.246.354c-.084.064-.19.088-.399.135l-.19.044c-.739.167-1.108.25-1.195.532c-.088.283.163.577.666 1.165l.13.152c.144.167.215.25.247.354c.032.104.022.215 0 .438l-.02.203c-.076.785-.114 1.178.116 1.352c.23.174.575.015 1.266-.303l.179-.082c.196-.09.294-.135.398-.135c.104 0 .203.045.399.135l.179.082c.69.319 1.036.477 1.266.303c.23-.174.192-.567.116-1.352l-.02-.203c-.022-.223-.033-.334 0-.438c.032-.103.103-.187.246-.354l.13-.152c.504-.588.755-.882.667-1.165c-.088-.282-.457-.365-1.194-.532l-.191-.044c-.21-.047-.315-.07-.399-.135c-.084-.064-.138-.16-.246-.354l-.098-.176c-.38-.682-.57-1.023-.855-1.023"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    {ordered[0].user && (
                        <Link href={`/game/bets/${ordered[0].id}`}>
                            <UserAvatar user={ordered[0].user} />{" "}
                        </Link>
                    )}
                    <div className="flex justify-center items-start py-4 bg-primary/80 h-44 w-20 rounded-t-xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-12 h-12 text-amber-300/80 hover:animate-bounce"
                        >
                            <path
                                fill="currentColor"
                                d="M12 16c-5.76 0-6.78-5.74-6.96-10.294c-.05-1.266-.076-1.9.4-2.485c.476-.586 1.045-.682 2.184-.874A26.374 26.374 0 0 1 12 2c1.783 0 3.253.157 4.377.347c1.138.192 1.708.288 2.183.874c.476.586.451 1.219.4 2.485C18.78 10.259 17.76 16 12 16"
                                opacity=".5"
                            ></path>
                            <path
                                fill="currentColor"
                                d="m17.64 12.422l2.817-1.565c.752-.418 1.128-.627 1.336-.979C22 9.526 22 9.096 22 8.235v-.073c0-1.043 0-1.565-.283-1.958s-.778-.558-1.768-.888L19 5l-.017.085c-.005.189-.013.395-.022.621c-.088 2.225-.377 4.733-1.32 6.716M5.04 5.706c.087 2.225.376 4.733 1.32 6.716l-2.817-1.565c-.752-.418-1.129-.627-1.336-.979C2 9.526 2 9.096 2 8.235v-.073c0-1.043 0-1.565.283-1.958s.778-.558 1.768-.888L5 5l.017.087c.005.188.013.394.022.62"
                            ></path>
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M5.25 22a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75"
                                clipRule="evenodd"
                            ></path>
                            <path
                                fill="currentColor"
                                d="M15.458 21.25H8.543l.297-1.75a1 1 0 0 1 .98-.804h4.36a1 1 0 0 1 .981.804z"
                                opacity=".5"
                            ></path>
                            <path
                                fill="currentColor"
                                d="M12 16c-.26 0-.51-.011-.75-.034v2.73h1.5v-2.73A7.98 7.98 0 0 1 12 16"
                            ></path>
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M12.787 5.807a.75.75 0 0 1 .463.693v4a.75.75 0 0 1-1.5 0V8.31l-.22.22a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 0 1 .817-.163"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    {ordered[1]?.user && (
                        <Link href={`/game/bets/${ordered[1].id}`}>
                            <UserAvatar user={ordered[1].user} />
                        </Link>
                    )}
                    <div className="flex justify-center items-start py-4 bg-primary/60 h-28 w-20 rounded-tr-xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-10 h-10 text-gray-500 hover:animate-bounce"
                        >
                            <path
                                fill="currentColor"
                                d="m12 16.068l-3.771 3.905c-.54.559-.81.839-1.04.935c-.52.22-1.099.032-1.373-.448c-.12-.21-.158-.59-.232-1.35c-.043-.43-.064-.644-.128-.824a1.433 1.433 0 0 0-.835-.864c-.173-.067-.38-.089-.795-.133c-.734-.077-1.101-.116-1.305-.24c-.463-.284-.646-.883-.433-1.422c.094-.237.364-.517.904-1.076L5.456 12l1.238-1.238zl5.306-5.306L18.544 12l2.464 2.55c.54.56.81.84.904 1.076c.213.54.03 1.139-.433 1.423c-.204.124-.57.163-1.305.24c-.414.044-.622.066-.795.133c-.389.149-.69.462-.835.864c-.064.18-.085.394-.128.823c-.075.76-.112 1.14-.232 1.351c-.274.48-.853.669-1.374.448c-.228-.096-.498-.376-1.038-.935z"
                                opacity=".5"
                            ></path>
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M12 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0-10c-.284 0-.474.34-.854 1.023l-.098.176c-.108.194-.162.29-.246.354c-.085.064-.19.088-.4.135l-.19.044c-.738.167-1.107.25-1.195.532c-.088.283.164.577.667 1.165l.13.152c.143.167.215.25.247.354c.032.104.021.215 0 .438l-.02.203c-.076.785-.114 1.178.115 1.352c.23.174.576.015 1.267-.303l.178-.082c.197-.09.295-.135.399-.135c.104 0 .202.045.399.135l.178.082c.691.319 1.037.477 1.267.303c.23-.174.191-.567.115-1.352l-.02-.203c-.021-.223-.032-.334 0-.438c.032-.103.104-.187.247-.354l.13-.152c.503-.588.755-.882.667-1.165c-.088-.282-.457-.365-1.195-.532l-.19-.044c-.21-.047-.315-.07-.4-.135c-.084-.064-.138-.16-.246-.354l-.098-.176C12.474 6.34 12.284 6 12 6"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>

            <table className="table text-base-content w-full">
                <tbody>
                    {ordered &&
                        ordered.map((bet, index) => {
                            return (
                                <tr key={bet.id}>
                                    <td>
                                        <div className="w-8 h-8 rounded-full text-base-content border border-primary-content flex justify-center items-center">
                                            <span>{index + 1}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <UserAvatar user={bet.user} size="w-12" />
                                            <div className="flex flex-col">
                                                <div className="font-bold">
                                                    {buildUserName(bet.user)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{bet.total ? `${bet.total} pts` : "-"}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </main>
    );
}

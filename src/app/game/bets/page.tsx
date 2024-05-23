import { BetsWithCelebrities } from "@/lib/types/bet";
import { getBetByUserAndYear } from "@/lib/api/bet";
import { currentUser } from "@clerk/nextjs";
import { head, last, sortBy } from "lodash";
import React from "react";
import dayjs from "dayjs";
import CelebrityAvatar from "@/components/business/user/CelebrityAvatar";
import Link from "next/link";

export default async function Page() {
    const user = await currentUser();

    // let bets: BetsWithUser[] = [];
    let myBet: BetsWithCelebrities | null = null;

    // const result = await listBetsByYear(2024);
    // if (result) bets = result;

    if (user?.externalId) {
        myBet = await getBetByUserAndYear(user?.externalId, 2024);
    }

    const celebrities = myBet?.CelebritiesOnBet.map((c) => c.celebrity);

    const olderCelebrity = head(sortBy(celebrities?.filter((c) => c.birth && !c.death), (c) => c.birth));
    const youngerCelebrity = last(sortBy(celebrities?.filter((c) => c.birth), (c) => c.birth));

    return (
        <main className="flex-1 overflow-auto">
            <div className="flex flex-col items-center gap-6 p-4">
                <div className="flex text-2xl font-bold">Mon pari 2024</div>
                {myBet && celebrities && (
                    <>
                        <div className="flex flex-row gap-8 justify-center px-2 py-4">
                            <div
                                className="radial-progress text-primary"
                                style={{
                                    // @ts-ignore
                                    "--value":
                                        (celebrities.filter((c) => !c.death).length /
                                            celebrities.length) *
                                            100 || 0,
                                    "--size": "8rem",
                                    "--thickness": "10px"
                                }}
                                role="progressbar"
                            >
                                <div className="flex flex-col items-center text-base-content">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="h-8 w-8 text-secondary/80"
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
                                    <span className="font-bold">
                                        {celebrities.filter((c) => !c.death).length} /{" "}
                                        {celebrities.length}
                                    </span>
                                    <span className="text-sm">en vie</span>
                                </div>
                            </div>
                            <div
                                className="radial-progress text-primary"
                                style={{
                                    // @ts-ignore
                                    "--value": "100",
                                    "--size": "8rem",
                                    "--thickness": "10px"
                                }}
                                role="progressbar"
                            >
                                <div className="flex flex-col items-center text-base-content">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="h-8 w-8 text-secondary/80"
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
                                            d="M12 16c-.26 0-.51-.011-.75-.034v2.73h1.5v-2.73A7.98 7.98 0 0 1 12 16m-.854-9.977C11.526 5.34 11.716 5 12 5c.284 0 .474.34.854 1.023l.098.176c.108.194.162.29.246.354c.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532c.088.283-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354c-.032.104-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352c-.23.174-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.135-.399-.135c-.104 0-.202.045-.399.135l-.178.082c-.691.319-1.037.477-1.267.303c-.23-.174-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438c-.032-.103-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165c.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135c.084-.064.138-.16.246-.354z"
                                        ></path>
                                    </svg>

                                    <span className="font-bold">5</span>
                                    <span className="text-sm">points</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex text-2xl font-bold">Aperçu des vivants</div>
                        <div className="flex flex-row gap-8 justify-center px-2">
                            <div>
                                {youngerCelebrity && (
                                    <div className="flex flex-col items-center">
                                        <CelebrityAvatar celebrity={youngerCelebrity} size="w-32" />
                                        <span>Plus jeune</span>
                                        <span>
                                            {youngerCelebrity.birth
                                                ? `${dayjs().diff(
                                                      youngerCelebrity.birth,
                                                      "year"
                                                  )} ans`
                                                : null}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                {olderCelebrity && (
                                    <div className="flex flex-col items-center">
                                        <CelebrityAvatar celebrity={olderCelebrity} size="w-32" />
                                        <span>Plus vieux</span>
                                        <span>
                                            {olderCelebrity.birth
                                                ? `${dayjs().diff(
                                                      olderCelebrity.birth,
                                                      "year"
                                                  )} ans`
                                                : null}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link href={`/game/bets/${myBet.id}`} className="btn btn-primary btn-wide">
                            Détail
                        </Link>
                    </>
                )}

                {/*<div className="flex flex-col gap-4">*/}
                {/*    <h1 className="text-5xl">Tous les paris</h1>*/}
                {/*</div>*/}
                {/*<BetsCardList bets={bets} />*/}
            </div>
        </main>
    );
}

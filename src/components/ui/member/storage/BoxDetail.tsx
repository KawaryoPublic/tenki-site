import { Box } from "@/lib/type";
import BlueButton from "../../global/button/BlueButton";
import WhiteFrame from "../../global/WhiteFrame";
import EditBoxForm from "./EditBoxForm";
import { Dispatch, SetStateAction } from "react";
import DeleteBoxButton from "./DeleteBoxButton";
import Link from "next/link";
import { checkPassword } from "@/lib/util";

export default function BoxDetail({ updateBox, setUpdateBox, password }: { updateBox: Box, setUpdateBox: Dispatch<SetStateAction<Box>>, password: string}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row">
                <div className="flex-1">
                    <WhiteFrame className="flex flex-col gap-2">
                        {
                            checkPassword(password) ? 
                            <>
                                <h2 className="text-xl border-b">詳細</h2>
                                <div>
                                    <EditBoxForm updateBox={updateBox} setUpdateBox={setUpdateBox} />
                                </div>
                            </> : 
                            <>
                                <h2 className="text-xl border-b">詳細</h2>
                                <div>
                                    <p className="font-bold">名前</p>
                                    <p className="whitespace-pre-wrap">{updateBox.name ? updateBox.name : "なし"}</p>
                                </div>
                                <div>
                                    <p className="font-bold">個数</p>
                                    <p className="whitespace-pre-wrap">{updateBox.number ? updateBox.number : "なし"}</p>
                                </div>
                                <div>
                                    <p className="font-bold">注記</p>
                                    <p className="whitespace-pre-wrap">{updateBox.annotation ? updateBox.annotation : "なし"}</p>
                                </div>
                                <div>
                                    <p className="font-bold">リンク</p>
                                    {
                                        updateBox.link ? 
                                        <Link href={updateBox.link} className="underline">こちらから</Link> : 
                                        <p>なし</p>
                                    }
                                </div>
                            </>
                        }
                    </WhiteFrame>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {
                    checkPassword(password) ? 
                    <div>
                        <DeleteBoxButton updateBox={updateBox} />
                    </div> : ""
                }
                <div>
                    <BlueButton>
                        <Link href={`/storage?floor=${updateBox.floor}`}>戻る</Link>
                    </BlueButton>
                </div>
            </div>
        </div>
    )

}
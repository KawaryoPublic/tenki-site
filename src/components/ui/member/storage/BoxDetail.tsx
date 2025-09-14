import { Box } from "@/lib/type";
import BlueButton from "../../global/button/BlueButton";
import RestrictedContent from "../../global/RestrictedContent";
import RestrictedLink from "../../global/RestrictedLink";
import WhiteFrame from "../../global/WhiteFrame";
import EditBoxForm from "./EditBoxForm";
import { Dispatch, SetStateAction } from "react";
import DeleteBoxButton from "./DeleteBoxButton";
import { EXECUTIVE_PASSWORD } from "@/lib/const";

export default function BoxDetail({ updateBox, setUpdateBox, q }: { updateBox: Box, setUpdateBox: Dispatch<SetStateAction<Box>>, q: string}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row">
                <div className="flex-1">
                    {
                        q !== EXECUTIVE_PASSWORD ? 
                        <WhiteFrame className="flex flex-col gap-2">
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
                                    <RestrictedLink href={updateBox.link} className="underline">こちらから</RestrictedLink> : 
                                    <p>なし</p>
                                }
                            </div>
                        </WhiteFrame> :
                        <RestrictedContent>
                            <WhiteFrame className="flex flex-col gap-2">
                                <h2 className="text-xl border-b">詳細</h2>
                                <div>
                                    <EditBoxForm updateBox={updateBox} setUpdateBox={setUpdateBox} />
                                </div>
                            </WhiteFrame>
                        </RestrictedContent>
                    }
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <DeleteBoxButton q={q} updateBox={updateBox} />
                </div>
                <div>
                    <BlueButton>
                        <RestrictedLink href="/storage" otherParams={`floor=${updateBox.floor}`}>戻る</RestrictedLink>
                    </BlueButton>
                </div>
            </div>
        </div>
    )

}
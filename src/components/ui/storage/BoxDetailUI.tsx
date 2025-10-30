import { Box, TIER } from "@/lib/type";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";
import EditBoxForm from "./Form/EditBoxForm";
import { Dispatch, SetStateAction } from "react";
import DeleteBoxButton from "./Button/DeleteBoxButton";
import { checkTier } from "@/lib/util";
import BlueButton from "../global/Button/BlueButton";

export default function BoxDetailUI({ updateBox, setUpdateBox, tier }: { updateBox: Box, setUpdateBox: Dispatch<SetStateAction<Box>>, tier: TIER}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row">
                <div className="flex-1">
                    <WhiteFrameUI className="flex flex-col gap-2">
                        {
                            checkTier(tier) ? 
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
                                    <p className="font-bold">コンテンツ</p>
                                    <p className="whitespace-pre-wrap">{updateBox.content ? updateBox.content : "なし"}</p>
                                </div>
                            </>
                        }
                    </WhiteFrameUI>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {
                    checkTier(tier) &&
                    <div>
                        <DeleteBoxButton updateBox={updateBox} />
                    </div>
                }
                <div>
                    <BlueButton href={`/storage/${updateBox.tab}`}>戻る</BlueButton>
                </div>
            </div>
        </div>
    )

}
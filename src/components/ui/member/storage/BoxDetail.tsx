import BlueButton from "../../global/button/BlueButton";
import RestrictedContent from "../../global/RestrictedContent";
import RestrictedLink from "../../global/RestrictedLink";
import WhiteFrame from "../../global/WhiteFrame";
import EditBoxForm from "./EditBoxForm";

export default function BoxDetail({ updateBox, setUpdateBox }: { updateBox: Box, setUpdateBox: Dispatch<SetStateAction<Box>>}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row">
                <div className="flex flex-1 flex-col gap-4">
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
                            <p className="whitespace-pre-wrap">{updateBox.link ? updateBox.link : "なし"}</p>
                        </div>
                    </WhiteFrame>
                    <RestrictedContent>
                        <WhiteFrame className="flex flex-col gap-2">
                            <h2 className="text-xl border-b">編集</h2>
                            <div>
                                <EditBoxForm updateBox={updateBox} setUpdateBox={setUpdateBox} />
                            </div>
                        </WhiteFrame>
                    </RestrictedContent>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <BlueButton>aaa</BlueButton>
                </div>
                <div>
                    <BlueButton>
                        <RestrictedLink href="/storage">戻る</RestrictedLink>
                    </BlueButton>
                </div>
            </div>
        </div>
    )

}
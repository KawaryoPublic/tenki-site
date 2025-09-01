"use client";

import { DateInfo } from "@/lib/type";
import { Suspense, useEffect, useState } from "react"
import { redirect } from "next/navigation";
import Form from "next/form";
import RestrictedContent from "../../ui/global/RestrictedContent";
import DefaultLink from "../../ui/global/DefaultLink";

export default function DateInfoSection({ id }: { id: number }) {
    const [ info, setInfo ] = useState<DateInfo>({id: -1, date: ""});

    useEffect(() => {
        fetch("/api/dateInfo").then(res => res.json()).then(data => {
            const info = data.find((info: DateInfo) => info.id === id);

            setInfo(info);
        })
    }, []);

    return (
        <div>
            <div className="pb-4">
                <h1 className="text-3xl">{`${info?.date}`}の詳細ページ</h1>
                <div>
                    予定: {info?.plan ? info.plan : "なし"}
                </div>
            </div>
            <Suspense>
                <RestrictedContent>
                    <div className="pt-4">
                        <h1 className="text-3xl">編集</h1>
                        <div>
                            <Form 
                                action={async (formData) => {
                                    await fetch("/api/dateInfo", {
                                        method: "PUT",
                                        body: JSON.stringify({
                                            id: info.id,
                                            date: info.date,
                                            plan: formData.get("plan")
                                        }),
                                    }).then(() => alert("保存しました"))
                                    .then(() => window.location.reload())
                                    .catch(err => console.log(err));
                             }}
                        >
                                <div>
                                    <label htmlFor="plan">予定: </label><br />
                                    <textarea 
                                        name="plan" 
                                        rows={10}
                                        cols={100}
                                        className="bg-white"
                                    >
                                    </textarea>
                                </div>
                                <div>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">保存</button>
                                </div>
                            </Form>
                        </div>
                        <div>
                            <button
                                onClick={async () => {
                                    confirm("本当に削除しますか？") && await fetch("/api/dateInfo", {
                                        method: "DELETE",
                                        body: JSON.stringify({ id: info.id }),
                                    }).then(() => alert("削除しました"))
                                    .catch(err => console.log(err));

                                    redirect("/calender");
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >削除</button>
                        </div>
                    </div>
                </RestrictedContent>
            </Suspense>
            <div>
                <DefaultLink href="/calender">日付一覧に戻る</DefaultLink>
            </div>
        </div>
    )
}
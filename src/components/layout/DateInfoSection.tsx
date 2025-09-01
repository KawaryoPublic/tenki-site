"use client";

import { DateInfo } from "@/lib/type";
import { useEffect, useState } from "react"
import Form from "next/form";
import RestrictedContent from "../ui/global/RestrictedContent";
import DefaultLink from "../ui/global/DefaultLink";

export default function DateInfoSection({ id }: { id: number }) {
    const [ info, setInfo ] = useState<DateInfo>({id: -1, date: "", club: false});

    useEffect(() => {
        fetch("/api/dateInfo").then(res => res.json()).then(data => {
            const info = data.find((info: DateInfo) => info.id === id);

            setInfo(info);
        })
    }, []);

    return (
        <div>
            <div className="pb-4">
                <h1 className="text-lg">{`${info?.date}`}の詳細ページ</h1>
                <div>
                    部活: {info?.club ? "あり" : "なし"}
                </div>
                <div>
                    予定: {info?.plan ? info.plan : "なし"}
                </div>
            </div>
            <RestrictedContent>
                <div className="pt-4">
                    <h1 className="text-lg">編集</h1>
                    <Form 
                        action={async (formData) => {
                            await fetch("/api/dateInfo", {
                                method: "PUT",
                                body: JSON.stringify({
                                    id: info.id,
                                    date: info.date,
                                    club: formData.get("club") === "on",
                                    plan: formData.get("plan")
                                }),
                            }).catch(err => console.log(err));

                            window.location.reload();
                        }}
                    >
                        <div>
                            <label htmlFor="club">部活: </label>
                            <input 
                                type="checkbox" 
                                name="club" 
                            />
                        </div>
                        <div>
                            <label htmlFor="plan">予定: </label>
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
            </RestrictedContent>
            <div>
                <DefaultLink href="/calender">日付一覧に戻る</DefaultLink>
            </div>
        </div>
    )
}
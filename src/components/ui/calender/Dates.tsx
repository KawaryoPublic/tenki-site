"use client";

import { DateInfo } from "@/lib/type";
import DefaultLink from "../global/DefaultLink";
import { useEffect, useState } from "react";

export default function Dates({index}: { index: number }) {
    const firstDate = new Date(new Date().getFullYear(), new Date().getMonth() + index, 1);
    const [ dateInfo, setDateInfo ] = useState<DateInfo[]>([]);

    useEffect(() => {
        fetch('/api/dateInfo').then(res => res.json()).then(data => setDateInfo(data)).catch(err => console.log(err));
    }, []);

    return (
        <div className="p-2 flex-1">
            <div className="grid grid-cols-7 grid-rows-6 gap-2 h-full">
            {
                Array.from({ length: 42 }, (_, i) => {
                    const date = new Date(firstDate);
                    date.setDate(date.getDate() + i - firstDate.getDay());

                    return date;
                }).map((date, index) => {
                    const info = dateInfo.find(d => d.date === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

                    return (
                        info ? 
                        <DefaultLink 
                            key={index} 
                            className={`
                                flex items-center justify-center rounded 
                                ${date.getMonth() === firstDate.getMonth() ? 'bg-red-300' : 'bg-gray-200 text-gray-400'}
                                ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500 font-bold' : ''}
                            `}
                            href={`/calender/${info.id}`}
                        >   
                            {date.getDate()}
                        </DefaultLink> :
                        <button
                            key={index} 
                            className={`
                                flex items-center justify-center rounded 
                                ${date.getMonth() === firstDate.getMonth() ? 'bg-white' : 'bg-gray-200 text-gray-400'}
                                ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500 font-bold' : ''}
                            `}
                            onClick={() => confirm("予定を追加しますか？") && 
                                fetch("/api/dateInfo", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
                                        plan: ""
                                    }),
                                }).then(() => alert("追加しました"))
                                .then(() => window.location.reload())))
                                .catch(err => console.log(err))
                            }
                        >
                            {date.getDate()}
                        </button>
                    );
                })
            }
        </div>
        </div>
        
    )
}
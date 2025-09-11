"use client";

import { DateInfo } from "@/lib/type";
import RestrictedLink from "@/components/ui/global/RestrictedLink";
import { useEffect, useState } from "react";
import AddDateInfoButton from "./AddDateInfoButton";

export default function Dates({ index }: { index: number }) {
    const firstDate = new Date(new Date().getFullYear(), new Date().getMonth() + index, 1);
    const [ dateInfo, setDateInfo ] = useState<DateInfo[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch('/api/dateInfo')
            .then(res => res.json())
            .then(data => setDateInfo(data))
            .finally(() => setLoading(false))
            .catch(err => console.log(err));
    }, []);

    return (
        loading ? <div>Loading...</div> : 
        <div className="flex-1">
            <div className="grid grid-cols-7 grid-rows-6 gap-2 h-full">
            {
                Array.from({ length: 42 }, (_, i) => {
                    const date = new Date(firstDate);
                    date.setDate(date.getDate() + i - firstDate.getDay());

                    return date;
                }).map((date, index) => {
                    const info = dateInfo.find((d: DateInfo) => d.date === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

                    return (
                        info ? 
                        <div className="flex flex-col rounded" key={index}>
                            <div className="w-full flex-1 flex flex-row">
                                <span>a</span>
                                <span>b</span>
                                <span>c</span>
                            </div>
                            <div className="w-full flex-3 flex items-center justify-center">
                                <RestrictedLink 
                                    key={index} 
                                    className={`
                                        ${date.getMonth() === firstDate.getMonth() ? '' : 'bg-gray-200 text-gray-400'}
                                        ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500 font-bold' : ''}
                            `       }
                                    href={`/calendar/${info.id}`}
                                >   
                                    {date.getDate()}
                                </RestrictedLink>
                            </div>
                            
                        </div> :
                        <div>
                            <AddDateInfoButton key={index} date={date} firstDate={firstDate} />
                        </div>  
                    );
                })
            }
            </div>
        </div>
        
    )
}
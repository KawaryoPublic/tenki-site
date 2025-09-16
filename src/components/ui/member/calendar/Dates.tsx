import { DateInfo } from "@/lib/type";
import AddDateInfoButton from "./AddDateInfoButton";
import DateElement from "./DateElement";
import Link from "next/link";

export default function Dates({ index, filter, dateInfo, password }: { index: number, filter: string | null, dateInfo: DateInfo[], password: string }) {
    const firstDate = new Date(new Date().getFullYear(), new Date().getMonth() + index, 1);

    return (
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
                        <div 
                            key={index}
                            className={`
                                flex flex-col items-center justify-center rounded
                                ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500 font-bold' : ''}
                                ${filter && info?.holiday.includes(filter) ? 'bg-yellow-200 hover:bg-yellow-300' : 
                                    date.getMonth() === firstDate.getMonth() ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-400 text-gray-600'
                                }
                            `}
                        >
                            {
                                info ? 
                                <Link href={`/calendar/${info.id}`} className="w-full h-full flex flex-col items-center justify-center">
                                    <DateElement date={date} info={info} />
                                </Link> :
                                <AddDateInfoButton date={date} password={password} />
                            }
                        </div>
                    );
                })
            }
            </div>
        </div>
        
    )
}
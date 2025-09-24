import { DateInfo, TIER } from "@/lib/type"
import AddDateInfoButton from "./AddDateInfoButton"
import Link from "next/link"

export default function DateElement({ date, info, filter, firstDate, tier, index }: { date: Date, info: DateInfo, filter: string, firstDate: Date, tier: TIER, index: number }) {
    return (
        <div 
            key={index}
            className={`
                flex flex-col items-center justify-center rounded
                ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500 font-bold' : ''}
                ${
                    filter && info?.holiday.includes(filter) ? 'bg-yellow-200 hover:bg-yellow-300' : 
                    date.getMonth() === firstDate.getMonth() ? 'text-gray-900 bg-gray-200 hover:bg-gray-300' : 'bg-disabled-date text-gray-700'
                }
            `}
        >
            {
                info ? 
                <Link href={`/calendar/${info.date}`} className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full h-full flex-1 flex flex-row items-center justify-around border-b border-gray-600">
                        <span className={`border rounded-full ${info?.plan ? "bg-blue-400" : ""} w-2 h-2`} />
                        <span className={`border rounded-full ${info?.event ? "bg-blue-400" : ""} w-2 h-2`} />
                        <span className={`border rounded-full ${info?.holiday ? "bg-blue-400" : ""} w-2 h-2`} />
                    </div>
                    <div className="w-full h-full flex-1 flex items-center justify-center">
                        <span className="w-full h-full flex items-center justify-center">{date.getDate()}</span>
                    </div>
                </Link> :
                <AddDateInfoButton date={date} tier={tier} />
            }
        </div>
    );
}
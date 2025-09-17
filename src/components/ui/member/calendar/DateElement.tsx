import { DateInfo } from "@/lib/type"

export default function DateElement({ date, info }: { date: Date, info: DateInfo }) {
    return (
        <>
            <div className="w-full h-full flex-1 flex flex-row items-center justify-around border-b border-gray-600">
                <span className={`border rounded-full ${info?.plan ? "bg-blue-400" : ""} w-2 h-2`} />
                <span className={`border rounded-full ${info?.event ? "bg-blue-400" : ""} w-2 h-2`} />
                <span className={`border rounded-full ${info?.holiday ? "bg-blue-400" : ""} w-2 h-2`} />
            </div>
            <div className="w-full h-full flex-1 flex items-center justify-center">
                <span className="w-full h-full flex items-center justify-center">{date.getDate()}</span>
            </div>
        </>
    );
}
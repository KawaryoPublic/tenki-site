import { DAYS } from "@/lib/const";
import Link from "next/link";

export default function Days({ observationDays }: { observationDays: Number[] }) {
    return (
        <div className="pt-3 pb-3 flex gap-2">
            {
                DAYS.map((day, index) => {
                    return (
                        index === 0 ?
                        <div 
                            key={index} 
                            className="w-full h-full font-bold flex items-center justify-center bg-gray-400 text-gray-800 rounded"
                        >
                            {day}
                        </div> :
                        <Link 
                            key={index} 
                            className={`
                                w-full h-full font-bold flex items-center justify-center rounded
                                ${observationDays.includes(index) ? 'bg-yellow-200 hover:bg-yellow-300' : 'bg-gray-200 hover:bg-gray-300'}
                            `}
                            href={`/calendar/edit_observation/${index}`}
                        >
                            {day}
                        </Link>
                    );
                })
            }
        </div>
    )
}
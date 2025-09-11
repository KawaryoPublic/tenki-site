import Link from "next/link";
import RestrictedLink from "../../global/RestrictedLink";
import { DAYS } from "@/lib/const";

export default function Days() {
    return (
        <div className="pt-3 pb-3 flex gap-2">
            {
                DAYS.map((day, index) => {
                    return (
                        index === 0 ?
                        <div 
                            key={index} 
                            className="w-full h-full font-bold flex items-center justify-center bg-gray-600 text-gray-400 rounded"
                        >
                            {day}
                        </div> :
                        <RestrictedLink 
                            key={index} 
                            className="w-full h-full font-bold flex items-center justify-center bg-white rounded"
                            href={`/calendar/edit_observation/${index}`}
                        >
                            {day}
                        </RestrictedLink>
                    );
                })
            }
        </div>
    )
}
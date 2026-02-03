import Link from "next/link";

export default function DayUI({ index, day, isObservationDay }: { index: number, day: string, isObservationDay: boolean }) {
    return (
        index === 0 ?
            <div 
                className="w-full h-full font-bold flex items-center justify-center bg-disabled-date text-gray-700 rounded"
            >
                {day}
            </div> :
            <Link 
                className={`
                    w-full h-full font-bold flex items-center justify-center rounded
                    ${isObservationDay ? 'bg-yellow-200 hover:bg-yellow-300 text-gray-900' : 'text-gray-900 bg-gray-200 hover:bg-gray-300'}
                `}
                    href={`/calendar/observation/${index}`}
            >
                {day}
            </Link>
    );
}
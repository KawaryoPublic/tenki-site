"use client";

import DefaultLink from "../DefaultLink";

export default function Dates({index}: { index: number }) {
    const firstDate = new Date(new Date().getFullYear(), new Date().getMonth() + index, 1);

    const dates = Array.from({ length: 42 }, (_, i) => {
        const date = new Date(firstDate);
        date.setDate(date.getDate() + i - firstDate.getDay());

        return date;
    });

    return (
        <div className="p-2 flex-1">
            <div className="grid grid-cols-7 grid-rows-6 gap-2 h-full">
            {
                dates.map((date, index) => (
                    <DefaultLink 
                        key={index} 
                        className={`
                            flex items-center justify-center rounded 
                            ${date.getMonth() === firstDate.getMonth() ? 'bg-white' : 'bg-gray-200 text-gray-400'}
                            ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500 font-bold' : ''}
                        `}
                        href={`/calender/${index}`}
                    >
                        {date.getDate()}
                    </DefaultLink>
                ))
            }
        </div>
        </div>
        
    )
}
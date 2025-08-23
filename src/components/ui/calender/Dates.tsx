"use client";

export default function Dates() {
    const firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const dates = Array.from({ length: 42 }, (_, i) => {
        const date = new Date(firstDate);
        date.setDate(date.getDate() + i - firstDate.getDay());

        return date;
    });

    return (
        <div className="flex flex-col basis-3 space-around">
            {
                Array.from({ length: 6 }).map((_, weekIndex) => {
                    const weekDates = dates.slice(weekIndex * 7, weekIndex * 7 + 7);

                    return (
                        <div className="flex flex-row space-around">
                            {
                                weekDates.map((date, dateIndex) => {
                                    return (
                                        <button key={dateIndex} className="m-1 p-2 border rounded text-center">
                                            {date.getDate()}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    )
}
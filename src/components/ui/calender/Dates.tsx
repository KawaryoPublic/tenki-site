"use client";

export default function Dates() {
    const firstDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const dates = Array.from({ length: 42 }, (_, i) => {
        const date = new Date(firstDate);
        date.setDate(date.getDate() + i - firstDate.getDay());

        return date;
    });

    return (
        <div>
            {
                Array.from({ length: 6 }).map((_, weekIndex) => {
                    const weekDates = dates.slice(weekIndex * 7, weekIndex * 7 + 7);

                    return (
                        <div>
                            {
                                weekDates.map((date, dateIndex) => {
                                    return (
                                        <button key={dateIndex} className="w-20 h-20 m-1 p-2 border rounded text-center">
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
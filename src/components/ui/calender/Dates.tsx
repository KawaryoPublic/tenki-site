"use client";

export default function Dates() {
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();

    const dates = Array.from({ length: 42 }, (_, i) => i + 1 - firstDay);

    return (
        <div>
            {
                dates.map((date, index) => {
                    return (
                        <button key={index} className="w-20 h-20 m-1 p-2 border rounded text-center">
                            {date > 0 ? date : ""}
                        </button>
                    );
                })
            }
        </div>
    )
}
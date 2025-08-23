"use client";

export default function Calender() {
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    alert(firstDay.getDay());

    return (
        <section>
            {
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => {
                    return (
                        <div key={index} className="w-20 h-20 m-1 p-2 border rounded font-bold text-center">
                            {day}
                        </div>
                    );
                })
            }
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((date, index) => {
                    return (
                        <button
                            key={index}
                            className="w-20 h-20 m-1 p-2 border rounded text-center"
                            onClick={e => {alert(`You clicked on date ${date}`)}}
                        >{date}</button>
                    );
                })
            }
        </section>
    )
}
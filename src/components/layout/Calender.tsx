"use client";

export default function Calender() {
    return (
        <section>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((date, index) => {
                    return (
                        <button
                            key={index}
                            onClick={e => {alert(`You clicked on date ${date}`)}}
                        >{date}</button>
                    )
                })
            }
        </section>
    )
}
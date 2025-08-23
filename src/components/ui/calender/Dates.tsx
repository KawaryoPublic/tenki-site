"use client";

export default function Dates() {
    return (
        <div>
            {
                <div>
                    {
                        Array.from({ length: 6 }).map((_, index) => {
                            return (
                                <div>
                                    {
                                        Array.from({ length: 7 }).map((_, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    className="w-20 h-20 m-1 p-2 border rounded text-center"
                                                    onClick={e => {alert(`You clicked on date ${date}`)}}
                                                >{date}</button>
                                            );
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
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
        </div>
    )
}
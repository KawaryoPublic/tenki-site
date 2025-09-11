import Link from "next/link";

export default function Days() {
    return (
        <div className="pt-3 pb-3 grid grid-cols-7 gap-2">
            {
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => {
                    return (
                        <Link 
                            key={index} 
                            className="flex items-center justify-center rounded"
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
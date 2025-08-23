export default function Days() {
    return (
        <div>
            {
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => {
                    return (
                        <span key={index} className="w-20 h-20 m-1 p-2 border rounded font-bold text-center">{day}</span>
                    );
                })
            }
        </div>
    )
}
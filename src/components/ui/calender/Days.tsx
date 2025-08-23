export default function Days() {
    return (
        <div>
            {
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => {
                    return (
                        <span key={index} className="m-1 p-2 border rounded text-center">{day}</span>
                    );
                })
            }
        </div>
    )
}
"use client";

export default function AddPlanButton({ date, firstDate }: { date: Date, firstDate: Date }) {
    return (
        <button
            className={`
                flex items-center justify-center rounded 
                ${date.getMonth() === firstDate.getMonth() ? 'bg-white' : 'bg-gray-200 text-gray-400'}
                ${date.toDateString() === new Date().toDateString() ? 'border-2 border-blue-500 font-bold' : ''}
        `   }
            onClick={() => {
                confirm("予定を追加しますか？") &&
                fetch("/api/dateInfo", {
                    method: "POST",
                    body: JSON.stringify({
                        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
                        plan: ""
                    }),
                }).then(() => alert("追加しました"))
                .then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
        >
            {date.getDate()}
        </button>
    )
}
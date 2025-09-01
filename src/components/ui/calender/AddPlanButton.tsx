"use client";

export default function AddPlanButton({ date }: { date: Date }) {
    return (
        <button
            className="w-full h-full"
            onClick={() => {
                if(confirm("予定を追加しますか？")) {
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
            }
        />
    )
}
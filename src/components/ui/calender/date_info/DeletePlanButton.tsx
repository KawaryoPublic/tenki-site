"use client";

export default function DeletePlanButton({ id }: { id: number }) {
    return (
        <button
            onClick={() => {
                fetch("/api/dateInfo", {
                    method: "DELETE",
                    body: JSON.stringify({ id }),
                }).then(() => alert("削除しました"))
                .catch(err => console.log(err));
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            削除
        </button>
    )
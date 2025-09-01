"use client";

export default function AddNotificationButton() {
    return (
        <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={async () => {
                await fetch('/api/notifications', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: "新しい通知",
                        content: "これはサンプルの通知です。",
                    }),
                });

                alert("通知が追加されました！");
            }}
        >
            通知を追加
        </button>
    );
}
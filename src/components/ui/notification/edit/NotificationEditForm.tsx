"use client";

import Form from "next/form";
import BlueButton from "../../global/button/BlueButton";

export default function NotificationEditForm() {
    return (
        <Form 
            action={async (data: FormData) => {
                await fetch('/api/notifications', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: data.get('title'),
                        content: data.get('content'),
                    }),
                }).then(() => alert("告知を追加しました"))
                .catch(err => console.log(err));
            }}
        >   
            <div>
                <label htmlFor="title">タイトル:</label><br />
                <textarea 
                    name="title" 
                    rows={1} 
                    className="bg-white w-full"
                />
            </div>
            <div>
                <label htmlFor="content">内容:</label><br />
                <textarea 
                    name="content" 
                    rows={10}
                    className="bg-white whitespace-pre-wrap w-full"
                />
            </div>
            <div>
                <BlueButton>追加</BlueButton>
            </div>
        </Form>
    )
}

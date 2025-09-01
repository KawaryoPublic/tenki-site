"use client";

import Form from "next/form";

export default function NotificationEditForm() {
    return (
        <Form 
            action={async (data: FormData) => {
                await fetch('/api/notification', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: data.get('title'),
                        content: data.get('content'),
                    }),
                }).catch(err => console.log(err));
            }}
        >   
            <div>
                <label htmlFor="title">タイトル:</label><br />
                <textarea 
                    name="title" 
                    rows={1} 
                    cols={100} 
                />
            </div>
            <div>
                <label htmlFor="content">内容:</label><br />
                <textarea 
                    name="content" 
                    rows={10}
                    cols={100}
                />
            </div>
            <div>
                <button type="submit">追加</button>
            </div>
        </Form>
    )
}
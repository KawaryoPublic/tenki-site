"use cliend";

export default function NotificationSection() {
    return (
        <section className="flex-1 flex flex-col min-h-[50%]">
            <h2 className="flex justify-center item-center font-bold">通知</h2>
            <div className="flex-1 flex flex-col justify-center items-center">
                <Notification title="通知1" updatedAt={new Date()} content="これは通知1の内容です。" />
            </div>
        </section>
    )
}
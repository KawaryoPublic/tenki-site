import { redirect } from "next/navigation";
import RedButton from "../../global/Button/RedButton";

export default function DeleteInfoButton({ date }: { date: string }) {
    return (
        <RedButton
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) return;

                await fetch("/api/date_info", {
                    method: "DELETE",
                    body: JSON.stringify({ date: date }),
                }).catch(err => console.log(err));

                redirect(`/calendar`);
            }}
        >
            削除
        </RedButton>
    );
}
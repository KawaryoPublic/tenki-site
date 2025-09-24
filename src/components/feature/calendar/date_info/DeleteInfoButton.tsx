import RedButton from "@/components/ui/Button/RedButton";
import { redirect } from "next/navigation";

export default function DeleteInfoButton({ date }: { date: string }) {
    return (
        <RedButton
            onClick={async () => {
                if(!confirm("本当に削除しますか？")) return;

                await fetch("/api/dateInfo", {
                    method: "DELETE",
                    body: JSON.stringify({ date: date }),
                }).catch(err => console.log(err));

                redirect(`/calendar`)
            }}
        >
            削除
        </RedButton>
    );
}
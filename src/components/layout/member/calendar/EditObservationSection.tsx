import EditObservationForm from "@/components/ui/member/calendar/edit_observation/EditObservationForm";
import { DAYS } from "@/lib/const";

export default function EditObservationSection({ day }: { day: number }) {
    return (
        <section>
            <h1 className="text-2xl">{DAYS[Number(day)]}曜日の観測</h1>
            <div>
                <EditObservationForm day={day}/>
            </div>
        </section>
    );
}
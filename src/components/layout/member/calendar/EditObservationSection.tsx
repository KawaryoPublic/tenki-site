import EditObservationForm from "@/components/ui/member/calendar/edit_observation/EditObservationForm";

export default function EditObservationSection({ day }: { day: number }) {
    return (
        <section>
            <h1 className="text-2xl">{day}日の観測編集</h1>
            <div>
                <EditObservationForm day={day}/>
            </div>
        </section>
    );
}
import Form from "next/form"
import { redirect } from "next/navigation";
import DefaultTextArea from "@/components/ui/Input/DefaultTextArea";
import BlueButton from "@/components/ui/Button/BlueButton";

export default function FilterObservationForm() {
    return (
        <Form
            action={formData => redirect(`/calendar?filter=${formData.get('filter')}`)}
            className="flex flex-row gap-2"
        >
            <DefaultTextArea
                title="記号を入力"
                name="filter"
                rows={1}
                className="flex-1"
            />
            <BlueButton>検索</BlueButton>
        </Form>
    );
}
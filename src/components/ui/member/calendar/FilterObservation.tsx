import DefaultTextArea from "../../global/DefaultTextArea";
import Form from "next/form"
import { redirect } from "next/navigation";

export default function FilterObservation() {
    return (
        <Form
            action={formData => redirect(`/calendar?filter=${formData.get('filter')}`)}
            className="flex flex-col md:flex-row gap-2"
        >
            <DefaultTextArea
                title="観測"
                name="filter"
                rows={1}
            />
        </Form>
    );
}
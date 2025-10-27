import Form from "next/form"
import { redirect } from "next/navigation";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Input/DefaultInputWithDefaultValue";

export default function FilterObservationForm() {
    return (
        <Form
            action={formData => redirect(`/calendar?filter=${formData.get('filter')}`)}
            className="flex flex-row gap-1"
        >
            <DefaultInput
                title="記号を入力"
                name="filter"
                className="flex-1"
            />
            <BlueButton>検索</BlueButton>
        </Form>
    );
}
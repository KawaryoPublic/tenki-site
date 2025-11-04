import Form from "next/form"
import { redirect } from "next/navigation";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";

export default function FilterObservationForm({ filter }: { filter: string }) {
    return (
        <Form
            action={data => redirect(`/calendar?filter=${data.get('filter')}`)}
            className="flex flex-row gap-1"
        >
            <DefaultInput
                title="記号を入力"
                name="filter"
                defaultValue={filter}
                className="flex-1"
            />
            <BlueButton>検索</BlueButton>
        </Form>
    );
}
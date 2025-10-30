import Form from "next/form";
import { Observation } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInputWithDefaultValue";

export default function EditObservationForm({ observation }: { observation: Observation }) {
    return (
        <Form 
            action={async (data: FormData) => {
                await fetch(`/api/observation?day=${observation.day}`, {
                    method: "PUT",
                    body: data,
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
            className="flex flex-col gap-2"
        >
            <DefaultInput
                title="朝"
                name="morning"
                defaultValue={observation.morning}
                required
                label
            />
            <DefaultInput
                title="昼"
                name="noon"
                defaultValue={observation.noon}
                required
                label
            />
            <DefaultInput
                title="放課後"
                name="afterSchool"
                defaultValue={observation.afterSchool}
                label
            />
            <div className="pt-4">
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}
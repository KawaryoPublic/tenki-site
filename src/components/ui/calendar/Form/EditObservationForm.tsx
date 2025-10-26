import Form from "next/form";
import { Observation } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import { DefaultInput } from "../../global/Input/DefaultInput";

export default function EditPlanForm({ observation }: { observation: Observation }) {
    return (
        <Form 
            action={async (formData) => {
                await fetch("/api/observation", {
                    method: "PUT",
                    body: JSON.stringify({
                        day: observation.day,
                        morning: formData.get("morning"),
                        noon: formData.get("noon"),
                        afterSchool: formData.get("afterSchool"),
                    }),
                }).then(() => window.location.reload())
                .catch(err => console.log(err));
            }}
            className="flex flex-col gap-2"
        >
            <DefaultInput
                title="朝"
                name="morning"
                defaultValue={observation.morning}
                label
            />
            <DefaultInput
                title="昼"
                name="noon"
                defaultValue={observation.noon}
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
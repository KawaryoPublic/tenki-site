import Form from "next/form";
import BlueButton from "@/components/ui/Button/BlueButton";
import { Observation } from "@/lib/type";
import DefaultTextArea from "@/components/ui/Input/DefaultTextArea";

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
            <DefaultTextArea
                title="朝"
                name="morning"
                rows={1}
                defaultValue={observation.morning}
                label
            />
            <DefaultTextArea
                title="昼"
                name="noon"
                rows={1}
                defaultValue={observation.noon}
                label
            />
            <DefaultTextArea
                title="放課後"
                name="afterSchool"
                rows={1}
                defaultValue={observation.afterSchool}
                label
            />
            <div className="pt-4">
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}
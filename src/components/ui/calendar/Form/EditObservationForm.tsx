"use client";

import Form from "next/form";
import { Observation } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import { redirect } from "next/navigation";

export default function EditObservationForm({ observation }: { observation: Observation }) {
    return (
        <Form 
            action={async data => {
                await fetch(`/api/observation?day=${observation.day}`, {
                    method: "PUT",
                    body: data,
                }).catch(err => console.log(err));

                redirect("/calendar");
            }}
            className="flex flex-col gap-2"
        >
            <DefaultAddableOption
                title="朝"
                name="morning"
                defaultOptions={observation.morning}
            />
            <DefaultAddableOption
                title="昼"
                name="noon"
                defaultOptions={observation.noon}
            />
            <DefaultAddableOption
                title="放課後"
                name="afterSchool"
                defaultOptions={observation.afterSchool}
            />
            <div className="pt-4">
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}
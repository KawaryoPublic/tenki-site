"use client";

import Form from "next/form";
import { Observation } from "@/lib/types";
import BlueButton from "../../../global/Button/BlueButton";
import DefaultAddableInput from "../../../global/Form/DefaultAddableOption";
import { redirect } from "next/navigation";
import { useActionState } from 'react';

export default function EditObservationForm({ observation }: { observation: Observation }) {
    const [state, formAction, pending] = useActionState(async (initState: any, formData: FormData) => {
        await fetch(`/api/calendar/observation?day=${observation.day}`, {
            method: 'PUT',
            body: formData,
        }).catch(err => {
            console.log(err);
            alert('保存に失敗しました。');
        });

        redirect(`/calendar/observation/${observation.day}`);
    }, null);

    return (
        <Form 
            action={formAction}
            className="flex flex-col gap-2"
        >
            <h2 className="text-xl lg:text-3xl font-bold border-b pb-2">観測シフトを編集</h2>
            <DefaultAddableInput
                title="朝"
                name="morning"
                defaultValues={observation.morning}
            />
            <DefaultAddableInput
                title="昼"
                name="noon"
                defaultValues={observation.noon}
            />
            <DefaultAddableInput
                title="放課後"
                name="afterSchool"
                defaultValues={observation.afterSchool}
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    );
}
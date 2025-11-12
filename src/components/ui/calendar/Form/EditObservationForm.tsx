"use client";

import Form from "next/form";
import { Observation, TIER } from "@/lib/type";
import BlueButton from "../../global/Button/BlueButton";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function EditObservationForm({ observation }: { observation: Observation }) {
    const [ saving, setSaving ] = useState(false);

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
            <h2 className="text-xl lg:text-3xl font-bold border-b pb-2">観測シフトを編集</h2>
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
                <BlueButton disabled={saving}>{saving ? "保存中..." : "保存"}</BlueButton>
            </div>
        </Form>
    );
}
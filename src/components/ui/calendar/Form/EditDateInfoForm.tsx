"use client";

import { DateInfo } from "@/lib/type";
import Form from "next/form";
import DefaultTextArea from "../../global/Form/DefaultTextArea";
import BlueButton from "../../global/Button/BlueButton";
import DefaultAddableOption from "../../global/Form/DefaultAddableOption";
import { redirect } from "next/navigation";

export default function EditDateInfoForm({ info }: { info: DateInfo }) {
    return (
        <Form 
            action={async data => {
                await fetch(`/api/date_info?date=${info.date}`, {
                    method: "PUT",
                    body: data
                }).catch(err => console.log(err));

                redirect("/calendar");
            }}
            className="flex flex-col gap-2"
        >
            <h2 className="text-xl lg:text-3xl font-bold border-b pb-2">詳細を編集</h2>
            <DefaultTextArea 
                title="予定" 
                name="plan" 
                defaultValue={info.plan} 
                rows={3} 
                label
            />
            <DefaultAddableOption 
                title="休日観測" 
                name="holiday" 
                defaultOptions={info.holiday} 
            />
            <div className="pt-4">
                <BlueButton>保存</BlueButton>
            </div>
        </Form>
    );
}
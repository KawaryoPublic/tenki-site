"use client";

import Form from "next/form";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { ROLE_LABELS } from "@/lib/const";

export default function DefaultSearchForm({ title, defaultValue, search, role = false, defaultRole, className = "" }: { title: string, defaultValue?: string, search: (searchString: string, role?: number) => void, role?: boolean, defaultRole?: number, className?: string }) {
    return (
        <Form 
            action={async data => {
                const role = data.get("role");
                search(data.get("search") as string || "", role == "" ? undefined : Number(role));
            }}
            className={`flex flex-row gap-1 ${className}`}
        >   
            <DefaultInput
                title={title}
                name="search"
                defaultValue={defaultValue}
                className="flex-1"
            />
            {
                role && 
                    <DefaultSelect
                        title="役職"
                        name="role"
                        defaultValue={defaultRole}
                        options={ROLE_LABELS.map((label, index) => ({ label: label, value: index }))}
                    />
            }
            <BlueButton>検索</BlueButton>
        </Form>
    )
}
"use client";

import Form from "next/form";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { ROLE_LABELS } from "@/lib/const";
import { Role } from "@/lib/types";
import { useState, useEffect } from "react";

export default function DefaultSearchForm({ title, defaultValue, search, role = false, defaultRole, className = "" }: { title: string, defaultValue?: string, search: (searchString: string, role?: number) => void, role?: boolean, defaultRole?: number, className?: string }) {
    const [ roles, setRoles ] = useState<Role[]>([]);

    useEffect(() => {
        if(role) {
            fetch('/api/role')
                .then(res => res.json())
                .then(data => setRoles(data))
                .catch(err => console.error(err));
        }
    }, []);

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
                        options={roles.map(role => ({ label: role.name, value: role.id }))}
                    />
            }
            <BlueButton>検索</BlueButton>
        </Form>
    )
}
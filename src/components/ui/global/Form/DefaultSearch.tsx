"use client";

import Form from "next/form";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { Role } from "@/lib/types";
import { useState } from "react";

export default function DefaultSearchForm({ title, defaultValue, search, roles, defaultRole, defaultImportant, className = "" }: { title: string, defaultValue?: string, search: (searchString: string, role?: number, important?: boolean) => void, roles?: Role[], defaultRole?: number, defaultImportant?: boolean, className?: string }) {
    const [ important, setImportant ] = useState<boolean | undefined>(defaultImportant);

    return (
        <Form 
            action={async data => {
                const role = data.get("role");
                search(data.get("search") as string || "", role == "" ? undefined : Number(role), important);
            }}
            className={`flex flex-col sm:flex-row gap-1 z-2 ${className}`}
        >   
            <DefaultInput
                title={title}
                name="search"
                defaultValue={defaultValue}
                className="flex-1 text-xs md:text-sm"
            />
            <div className="flex gap-1 md:gap-2">
                {
                    roles &&
                        <DefaultSelect
                            title="役職"
                            name="role"
                            defaultValue={defaultRole}
                            options={roles.map(role => ({ label: role.name, value: role.id }))}
                        />
                }
                {
                    important != undefined &&
                        <div className="flex gap-1 md:gap-2 bg-gray-300 border border-gray-600 rounded-md px-2 py-1">
                            <span className="text-sm md:text-base text-black flex justify-center items-center">重要:</span>
                            <DefaultInput
                                title="重要"
                                name="important"
                                type="checkbox"
                                className="w-4"
                                checked={important}
                                onChange={e => setImportant(e.target.checked)}
                            />
                        </div>
                }
                <BlueButton className="ml-auto">検索</BlueButton>
            </div>
            
        </Form>
    )
}
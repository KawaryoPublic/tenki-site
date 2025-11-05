"use client";

import Form from "next/form";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";

export default function DefaultSearchForm({ title, defaultValue, search }: { title: string, defaultValue?: string, search: (searchString: string) => void }) {
    return (
        <Form 
            action={async data => {
                search(data.get("search") as string || "");
            }}
            className="flex flex-row gap-1"
        >   
            <DefaultInput
                title={title}
                name="search"
                defaultValue={defaultValue}
                className="flex-1"
                required
            />
            <BlueButton>検索</BlueButton>
        </Form>
    )
}
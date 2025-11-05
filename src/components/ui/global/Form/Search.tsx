"use client";

import Form from "next/form";
import BlueButton from "../Button/BlueButton";
import DefaultInput from "./DefaultInput";

export default function SearchForm({ title = "検索", search }: { title?: string, search: (searchString: string) => void }) {
    return (
        <Form 
            action={async data => {
                search(data.get("search"))
            }}
            className="flex flex-row gap-1"
        >   
            <DefaultInput
                title={title}
                name="search"
                required
                className="flex-1"
            />
            <BlueButton>検索</BlueButton>
        </Form>
    )
}

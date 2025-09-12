"use client";

import DefaultTextArea from "../../global/DefaultTextArea";
import Form from "next/form"
import { redirect } from "next/navigation";
import BlueButton from "../../global/button/BlueButton";
import { useSearchParams } from "next/navigation";

export default function FilterObservation() {
    const q = useSearchParams().get("q");

    return (
        <Form
            action={formData => redirect(`/calendar?q=${q}&filter=${formData.get('filter')}`)}
            className="flex flex-row"
        >
            <DefaultTextArea
                title="記号を入力"
                name="filter"
                rows={1}
                className="flex-1"
            />
            <BlueButton>検索</BlueButton>
        </Form>
    );
}
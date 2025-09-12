"use client";

import DefaultTextArea from "../../global/DefaultTextArea";
import Form from "next/form"
import { redirect } from "next/navigation";
import BlueButton from "../../global/button/BlueButton";

export default function FilterObservation() {
    return (
        <Form
            action={formData => redirect(`/calendar?filter=${formData.get('filter')}`)}
            className="flex flex-row"
        >
            <DefaultTextArea
                title="観測"
                name="filter"
                rows={1}
                className="flex-1"
                label
            />
            <BlueButton>検索</BlueButton>
        </Form>
    );
}
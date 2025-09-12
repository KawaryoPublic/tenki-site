"use client";

import DefaultTextArea from "../../global/DefaultTextArea";
import Form from "next/form"
import { redirect } from "next/navigation";

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
            <button>検索</button>
        </Form>
    );
}
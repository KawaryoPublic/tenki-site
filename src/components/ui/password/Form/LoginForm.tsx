"use client";

import Form from "next/form";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";
import { useActionState } from 'react';
import { login } from "@/lib/actions";
import { useEffect } from "react";

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(login, null);

    useEffect(() => {
        if (state?.error) {
            alert(state.error);
        }
    }, [state]);

    return (
        <Form
            action={formAction}
            className="w-full flex flex-col gap-2"
        >
            <DefaultInput
                name="password"
                title="パスワード"
                type="password"
                required
            />
            <div className="pt-4">
                <BlueButton disabled={pending}>{pending ? "ログイン中..." : "決定"}</BlueButton>
            </div>
        </Form>
    );
}

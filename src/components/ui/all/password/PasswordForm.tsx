import Form from "next/form";
import { redirect } from "next/navigation";
import BlueButton from "@/components/ui/global/button/BlueButton";
import { EXECUTIVE_PASSWORD, PARENT_PASSWORD, STUDENT_PASSWORD } from "@/lib/const";

export default function PasswordForm() {
    return (
        <Form
            action={async (formData) => {
                "use server";
                const password = formData.get("password");

                if (password !== STUDENT_PASSWORD && password !== PARENT_PASSWORD && password !== EXECUTIVE_PASSWORD) alert("パスワードが違います");

                redirect(`/notification?q=${password}`);
            }}
        >
            <input 
                type="password"
                name="password" 
                placeholder="パスワード" 
            />
            <BlueButton>決定</BlueButton>
        </Form>
    );
}

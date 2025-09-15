import Form from "next/form";
import { redirect } from "next/navigation";
import BlueButton from "@/components/ui/global/button/BlueButton";
import { EXECUTIVE_PASSWORD, PARENT_PASSWORD, STUDENT_PASSWORD } from "@/lib/const";
import { cookies } from "next/headers";

export default function PasswordForm() {
    return (
        <Form
            action={async (formData) => {
                "use server";
                const password = formData.get("password");

                if (password !== STUDENT_PASSWORD && password !== PARENT_PASSWORD && password !== EXECUTIVE_PASSWORD) {
                    return;
                }

                const cookieStore = await cookies();
                cookieStore.set("password", password, {secure: true, httpOnly: true});
                
                redirect(`/home`);
            }}
            className="ml-auto pr-4"
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

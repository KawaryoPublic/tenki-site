import Form from "next/form";
import { redirect } from "next/navigation";
import { EXECUTIVE_PASSWORD, PARENT_PASSWORD, STUDENT_PASSWORD } from "@/lib/const";
import { cookies } from "next/headers";
import { TIER } from "@/lib/types";
import BlueButton from "../../global/Button/BlueButton";
import DefaultInput from "../../global/Form/DefaultInput";

export default function PasswordForm() {
    return (
        <Form
            action={async data => {
                "use server";
                const password = data.get("password");
                let tier = TIER.NONE;

                switch (password) {
                    case STUDENT_PASSWORD: tier = TIER.STUDENT; break;
                    case PARENT_PASSWORD: tier = TIER.PARENT; break;
                    case EXECUTIVE_PASSWORD: tier = TIER.ADMIN; break;
                }

                const cookieStore = await cookies();
                cookieStore.set("tier", tier, {
                    secure: true, 
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                });
                
                redirect(`/`);
            }}
            className="w-full flex flex-col gap-2"
        >
            <DefaultInput
                name="password"
                title="パスワード"
                type="password"
                required
            />
            <div className="pt-4">
                <BlueButton>決定</BlueButton>
            </div>
        </Form>
    );
}

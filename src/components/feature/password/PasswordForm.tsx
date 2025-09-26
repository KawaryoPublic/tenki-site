import Form from "next/form";
import { redirect } from "next/navigation";
import BlueButton from "@/components/ui/Button/BlueButton";
import { EXECUTIVE_PASSWORD, PARENT_PASSWORD, STUDENT_PASSWORD } from "@/lib/const";
import { cookies } from "next/headers";
import { TIER } from "@/lib/type";
import DefaultTextArea from "@/components/ui/Input/DefaultTextArea";

export default function PasswordForm() {
    return (
        <Form
            action={async (formData) => {
                "use server";
                const password = formData.get("password");
                let tier = TIER.NONE;

                switch (password) {
                    case STUDENT_PASSWORD: tier = TIER.STIDEMT; break;
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
            <DefaultTextArea
                title="パスワード" 
                name="password" 
                rows={1}
                label
            />
            <div className="pt-4">
                <BlueButton>決定</BlueButton>
            </div>
        </Form>
    );
}

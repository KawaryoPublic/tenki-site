import Form from "next/form";
import { redirect } from "next/navigation";
import BlueButton from "@/components/ui/Button/BlueButton";
import { EXECUTIVE_PASSWORD, PARENT_PASSWORD, STUDENT_PASSWORD } from "@/lib/const";
import { cookies } from "next/headers";
import { TIER } from "@/lib/type";

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

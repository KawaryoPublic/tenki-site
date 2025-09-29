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
            <div className="text-gray-900 flex flex-col gap-1">
                <label htmlFor="password" className="font-bold">パスワード</label>
                <input 
                    name="password"
                    type="password"
                    className="bg-gray-300 w-full border border-gray-600 rounded-md px-2 py-1 flex-1"
                />
            </div>
            <div className="pt-4">
                <BlueButton>決定</BlueButton>
            </div>
        </Form>
    );
}

import EditNotificationSection from "@/components/layout/member/notification/EditNotificationSection";
import { getPassword } from "@/lib/action";
import { checkPassword } from "@/lib/util";

export default async function Home() {
    const password = await getPassword();

    return (
        <div className="flex-1 flex flex-col">
            {
                checkPassword(password) ? <EditNotificationSection /> : ""
            }
        </div>
    )
}
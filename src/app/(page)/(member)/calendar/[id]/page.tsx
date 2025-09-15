import DateInfoSection from "@/components/layout/member/calendar/DateInfoSection";
import { getPassword } from "@/lib/action";
import { checkPassword } from "@/lib/util";

export default async function Home({ params }: { params: { id: number } }) {
    const password = await getPassword();

    return (
        <div className="flex-1 flex flex-col">
            {
                checkPassword(password, false, true) ? <DateInfoSection id={(await params).id} password={password} /> : ""
            }
        </div>
    );
}
import EditObservationSection from "@/components/layout/member/calendar/EditObservationSection";
import { getPassword } from "@/lib/action";
import { checkPassword } from "@/lib/util";

export default async function Home({ params }: { params: { day: string } }) {
    const password = await getPassword()

    return (
        <div className="flex-1 flex flex-col">
            {
                checkPassword(password, false, true) ? 
                <EditObservationSection day={Number(params.day)} password={password} /> : ""
            }
        </div>
    );
}
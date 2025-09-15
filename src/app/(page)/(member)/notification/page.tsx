import NotificationSection from "@/components/layout/member/notification/NotificationSection";
import BlueButton from "@/components/ui/global/button/BlueButton";
import { getPassword } from "@/lib/action";
import { checkPassword } from "@/lib/util";
import Link from "next/link";

export default async function Home() {
  const password = await getPassword();

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col items-center gap-4">
        {
          checkPassword(password) ? 
          <div className="w-full">
            <BlueButton>
              <Link href="/notification/edit">追加</Link>
            </BlueButton>
          </div> : ""
        }
        <NotificationSection password={password} />
      </div>
    </div>
  );
}
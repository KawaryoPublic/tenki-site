import StorageSection from "@/components/layout/member/storage/StorageSection";
import { getPassword } from "@/lib/action";
import { checkPassword } from "@/lib/util";

export default async function Home() {
  const password = await getPassword();
  return (
    <div className="flex-1">
      {
        checkPassword(password, false, true) ? <StorageSection password={password} /> : ""
      }
    </div>
  );
}
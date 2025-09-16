import StorageSection from "@/components/layout/member/storage/StorageSection";
import { getPassword } from "@/lib/action";
import { checkPassword } from "@/lib/util";
export default async function Home({ params }: { params: { tab: string }}) {
  const password = await getPassword();
  const tab = (await params).tab;

  return (
    <div className="flex-1">
      
      {
        checkPassword(password, false, true) ? (
          <div className="max-h-full h-full">
            <StorageSection password={password} tab={Number(tab)}/>
          </div>
          
         ) : ""
      }
    </div>
  );
}
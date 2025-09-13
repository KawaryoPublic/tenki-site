import StorageSection from "@/components/layout/member/storage/StorageSection";
import RestrictedContent from "@/components/ui/global/RestrictedContent";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex-1 max-h-full h-full">
      <Suspense>
        <RestrictedContent>
          <StorageSection />
        </RestrictedContent>
      </Suspense>
    </div>
  );
}
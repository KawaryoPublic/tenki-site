
import FileSection from "@/components/feature/file/FileSection";
import { getTier } from "@/lib/action";

export default async function Home() {
  const tier = await getTier();

  return (
    <FileSection tier={tier} />
  );
}
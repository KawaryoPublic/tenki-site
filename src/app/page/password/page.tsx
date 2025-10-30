import PasswordForm from "@/components/ui/password/Form/PasswordForm";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";

export default function Home() {
  return (
    <div className="w-full">
      <WhiteFrameUI>
        <PasswordForm />
      </WhiteFrameUI>
    </div>
  );
}
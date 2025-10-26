import PasswordForm from "@/components/ui/password/Form/PasswordForm";
import WhiteFrame from "@/components/ui/global/WhiteFrame";

export default function Home() {
  return (
    <div className="w-full">
      <WhiteFrame>
        <PasswordForm />
      </WhiteFrame>
    </div>
  );
}
import PasswordForm from "@/components/feature/password/PasswordForm";
import WhiteFrame from "@/components/ui/WhiteFrame";

export default function Home() {
  return (
    <div className="w-full">
      <WhiteFrame>
        <PasswordForm />
      </WhiteFrame>
    </div>
  );
}
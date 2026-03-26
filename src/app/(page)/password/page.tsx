import PasswordForm from "@/components/ui/password/Form/PasswordForm";
import WhiteFrameUI from "@/components/ui/global/WhiteFrameUI";

export default function Home() {
  return (
    <section className="w-full">
      <WhiteFrameUI>
        <PasswordForm />
      </WhiteFrameUI>
    </section>
  );
}
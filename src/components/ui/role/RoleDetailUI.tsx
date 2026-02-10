import Image from "next/image";
import WhiteFrameUI from "../global/WhiteFrameUI";
import BlueButton from "../global/Button/BlueButton";

export default function RoleDetailUI({ id }: { id: number }) {
    const role = {
      id: "1",
      name: "部長",
      description: "開成学園天文気象部の部長です。\n天文気象部は1931年から続く歴史のある部活です。\nそんな天文気象部を運営しているのが部長です。\n他の役職をまとめたり、普段の部活動の内容を決めたりしています。\n部活の代表として色々な仕事をしています。",
    };

    return (
        <section className="w-full">
            <WhiteFrameUI className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <div href={`role/${role.id}`} className="w-12 relative flex aspect-square">
                        <Image src="/image/role_test.png" alt="Role Icon" fill sizes="w-full h-full" />
                    </div>
                    <div className="flex-1 whitespace-pre-wrap">
                        <p>{role.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div href={`role/${role.id}`} className="w-12 relative flex aspect-square">
                        <Image src="/image/role_test.png" alt="Role Icon" fill sizes="w-full h-full" />
                    </div>
                    <div className="flex-1 whitespace-pre-wrap">
                        <p>...</p>
                    </div>
                </div>
                <div>
                    <BlueButton href="/role">役職一覧に戻る</BlueButton>
                </div>
            </WhiteFrameUI>
        </section>
    )
}
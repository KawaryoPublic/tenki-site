import Image from "next/image";
import WhiteFrameUI from "../global/WhiteFrameUI";
import BlueButton from "../global/Button/BlueButton";
import { Notification, Role } from "@/lib/types";
import { checkTier } from "@/lib/utils";
import DeleteRoleButton from "./Button/DeleteRoleButton";

export default function RoleDetailUI({ role, notifications, tier }: { role: Role, notifications: Notification, tier: number }) {
    return (
        <WhiteFrameUI className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl md:text-3xl font-bold">{role.name}</h2>
                <div className="flex items-center gap-2 md:gap-4">
                {
                    checkTier(tier) && 
                    <>
                        <BlueButton href={`/role/edit/${role.id}`}>編集</BlueButton>
                        <DeleteRoleButton id={role.id} />
                    </>
                }
                </div>
            </div>
            <h3 className="md:text-xl font-bold">概要</h3>
            <div className="flex items-center gap-4">
                <div className="w-[12%] relative flex aspect-square">
                    <Image src="/image/role_test.png" alt="Role Mark" fill sizes="w-full h-full" />
                </div>
                <div className="flex-1 whitespace-pre-wrap">
                    <p>{role.description}</p>
                </div>
            </div>
            <div className="flex justify-between items-center border-b pt-8 pb-2">
                <h2 className="text-xl md:text-3xl font-bold">現{role.name}チーフ</h2>
            </div>
            <h3 className="md:text-xl font-bold">{role.person}</h3>
            <div className="flex items-center gap-4">
                <div className="w-[12%] relative flex aspect-square">
                    <Image src="/image/role_test.png" alt="Person Picture" fill sizes="w-full h-full" />
                </div>
                <div className="flex-1 whitespace-pre-wrap">
                    <p>{role.personDetail}</p>
                </div>
            </div>
            <h3 className="md:text-xl font-bold">告知</h3>
            <div className="flex flex-col gap-4">
                {
                    notifications.map((notification, index) => (
                        <div key={index}>
                            <NotificationUI notification={notification} tier={tier} />
                        </div>
                    ))
                }
            </div>
        </WhiteFrameUI>
    );
}
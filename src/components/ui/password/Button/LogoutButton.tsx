"use client";

import { logout } from "@/lib/actions";
import RedButton from "../../global/Button/RedButton";

export default function LogoutButton() {
    return (
        <RedButton onClick={async () => {
            if(confirm("本当にログアウトしますか？")) {
                await logout();
            }
        }}>ログアウト</RedButton>
    )
}
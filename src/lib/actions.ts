"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server"; 
import { PARENT_PASSWORD, STUDENT_PASSWORD, EXECUTIVE_PASSWORD } from "./const";

export const getTier = async (request?: NextRequest) => {
    const cookieStore = request ? (await request.cookies) : (await cookies());
    return Number(cookieStore.get("tier")?.value) || 0;
}

export const login = async (initState: any, formData: FormData) => {
    let tier = "0";
    const password = formData.get("password");

    switch (password) {
        case PARENT_PASSWORD: tier = "1"; break;
        case STUDENT_PASSWORD: tier = "2"; break;
        case EXECUTIVE_PASSWORD: tier = "3"; break;
        default: return { success: false, error: "パスワードが間違っています。" };
    }

    const cookieStore = await cookies();
    cookieStore.set("tier", tier, {
        secure: true, 
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
    
    return { success: true };
}

export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.set("tier", "0", {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
}
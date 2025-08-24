"use server";

import { Dispatch, SetStateAction } from "react";
import { DateInfo, Passwords } from "./type";

export async function getPasswords(setPasswords: Dispatch<SetStateAction<Passwords>>) {
    fetch('/data/passwords.json', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
       setPasswords(data);
    })
}

export async function getDateInfo(setDataInfo: Dispatch<SetStateAction<DateInfo[]>>) {
    fetch('/data/dateInfo.json', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
       setDataInfo(data);
    })
}
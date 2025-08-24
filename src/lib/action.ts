import { headers } from "next/headers";

export async function fetchJson(url: string) {
    const headersData = headers();
    const res = await fetch(`${headersData.get("x-forwarded-proto") ?? "http"}://${headersData.get("host")}${url}`);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}
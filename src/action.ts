"use server";

export async function getPasswords(): Promise<{student: string | null, parent: string | null, executive: string | null}> {
    fetch('/data/passwords.json', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
       return data;
    })

    return {student: null, parent: null, executive: null};
}

export async function getDatePlans(): Promise<{date: string, club: boolean, plan: string}[]> {
    fetch('/data/plans.json', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
       return data;
    })

    return [];
}
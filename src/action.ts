"use server";

export async function getPasswords(setPasswords: React.Dispatch<React.SetStateAction<{student: string | null, parent: string | null, executive: string | null}>>) {
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

export async function getDatePlans(setDataPlans: SetStateAction<{date: string, club: boolean, plan: string}[]>) {
    fetch('/data/plans.json', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
       setDataPlans(data);
    })
}
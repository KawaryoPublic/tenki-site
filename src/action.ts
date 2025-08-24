"use server";

export async function getPasswords() {
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
}

export async function getDatePlans() {
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
}
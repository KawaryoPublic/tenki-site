"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Files() {
    const [files, setFiles] = useState<{path: string, title: string, type: string}[]>([]);

    useEffect(() => {
        fetch("/data/files.json", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setFiles(data.files);
        });
    }, []);

    return (
        <section>
            <ul>
                {
                    files.map((file, index) => {
                        return (
                            <li key={index}>
                                <Link href={file.path}>
                                    {file.title} ({file.type})
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    )
}
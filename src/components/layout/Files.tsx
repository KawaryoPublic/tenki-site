"use client"

import { usestate, useeffect } from "react";

export default function Files() {
    const [files, setFiles] = usestate([{path: null, title: null, type: null}]);

    useeffect(() => {
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
                    });
                }
            </ul>
        </section>
    )
}
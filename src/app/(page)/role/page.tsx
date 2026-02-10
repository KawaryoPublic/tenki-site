import { ROLE_LABELS } from "@/lib/const";

export default function Home() {
    return (
        <div>
            <h1>各役職</h1>
            {
                ROLE_LABELS.map((label, index) => (
                    <div key={index}>
                        <h2>{index}: {label}</h2>
                        <div>...</div>
                    </div>
                ))
            }
        </div>
    );
}
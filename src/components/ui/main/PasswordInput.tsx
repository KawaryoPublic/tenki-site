"use client";

import { useState } from "react";

export default function PasswordInput() {
    const [password, setPassword] = useState("");

    return (
        <div>
            <input 
                type="password"
                name="password" 
                placeholder="パスワード" 
                value={password}
                onChange={e => setPassword(e.target.value)} 
            />
            <button
                onClick={e => location.href = `/home?q=${password}`}
            >決定</button>
        </div>
    );
}

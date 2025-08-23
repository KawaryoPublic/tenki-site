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
        </div>
    );
}
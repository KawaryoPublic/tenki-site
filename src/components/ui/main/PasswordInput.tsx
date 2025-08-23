"use client";

export default function PasswordInput() {
    return (
        <div>
            <input 
                type="password"
                name="password" 
                placeholder="パスワード" 
                onChange={e => location.href = `/home?password=${e.target.value}`} 
            />
        </div>
    );
}

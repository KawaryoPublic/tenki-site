import PasswordInput from "@/components/ui/main/PasswordInput";

export default function Home() {
  return (
    <main>
      <div>パスワード</div>
      <div>
        <input 
          type="password"
          name="password" 
          placeholder="パスワード" 
          onChange={e => location.href = `/home?password=${e.target.value}`} 
        />
      </div>
    </main>
  );
}
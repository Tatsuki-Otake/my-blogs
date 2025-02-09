"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/v1/auth/sign_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const headers = response.headers;
      localStorage.setItem("access-token", headers.get("access-token")!);
      localStorage.setItem("client", headers.get("client")!);
      localStorage.setItem("uid", headers.get("uid")!);
      router.push("/");
    } else {
      alert("ログインに失敗しました");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full text-black"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full text-black"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          ログイン
        </button>
      </form>
      <div className="text-center mt-4">
        <p>アカウントをお持ちでないですか？</p>
        <Link href="/register" className="text-blue-500 hover:underline">新規登録</Link>
      </div>
    </div>
  );
}

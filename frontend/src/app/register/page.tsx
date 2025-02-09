"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/v1/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    });

    if (response.ok) {
      const headers = response.headers;
      localStorage.setItem("access-token", headers.get("access-token")!);
      localStorage.setItem("client", headers.get("client")!);
      localStorage.setItem("uid", headers.get("uid")!);
      router.push("/");
    } else {
      const errorData = await response.json();
      alert(`登録に失敗しました: ${errorData.errors.full_messages.join(", ")}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">新規登録</h1>
      <form onSubmit={handleRegister} className="space-y-4">
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
        <input
          type="password"
          placeholder="パスワード確認"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="border p-2 w-full text-black"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          登録
        </button>
      </form>
    </div>
  );
}

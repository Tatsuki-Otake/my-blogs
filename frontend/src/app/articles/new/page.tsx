"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewArticle() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    const response = await fetch("http://localhost:3000/api/v1/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": token!,
        "client": client!,
        "uid": uid!,
      },
      body: JSON.stringify({ article: { title, content } }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("投稿に失敗しました");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">新しい記事を投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full text-black"
          required
        />
        <textarea
          placeholder="本文"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full text-black"
          rows={5}
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            投稿
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded"
            onClick={() => router.push("/")}
          >
            記事一覧へ戻る
          </button>
        </div>
      </form>
    </div>
  );
}

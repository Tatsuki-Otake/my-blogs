"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditArticle() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/v1/articles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article: { title, content } }),
    });

    if (response.ok) {
      router.push(`/articles/${id}`);
    } else {
      alert("更新に失敗しました");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">記事を編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full text-black"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full text-black"
          rows={5}
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          更新
        </button>
      </form>
      <div className="flex gap-4">
        <button
          type="button"
          className="bg-gray-500 text-white p-2 rounded"
          onClick={() => router.push(`/articles/${id}`)}
        >
          戻る
        </button>
      </div>
    </div>
  );
}

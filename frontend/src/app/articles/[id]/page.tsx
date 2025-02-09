"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  content: string;
};

export default function ArticleDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/api/v1/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;
    const response = await fetch(`http://localhost:3000/api/v1/articles/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("削除に失敗しました");
    }
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-lg text-gray-700">{article.content}</p>
      <div className="flex gap-4 mt-4">
        <Link href={`/articles/${id}/edit`}>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            編集
          </button>
        </Link>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          削除
        </button>
      </div>
      <a href="/" className="text-blue-500 mt-4 block">← 記事一覧に戻る</a>
    </div>
  );
}

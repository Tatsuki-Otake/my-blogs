"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    setIsLoggedIn(!!token);

    fetch("http://localhost:3000/api/v1/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold mb-6 text-center">ブログ記事一覧</h1>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            ログアウト
          </button>
        ) : (
          <Link href="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              ログイン
            </button>
          </Link>
        )}
      </div>
      {!isLoggedIn && (
        <div className="flex justify-end mb-4">
          <Link href="/register">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              新規登録
            </button>
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div className="flex justify-end mb-4">
          <Link href="/articles/new">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              新規投稿
            </button>
          </Link>
        </div>
      )}
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">
              <Link href={`/articles/${article.id}`} className="text-blue-500 hover:underline">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600">{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

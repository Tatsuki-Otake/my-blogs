# My Blog Application

ブログ投稿アプリケーション（Next.js + Rails API）

## 技術スタック

### フロントエンド
- Next.js 15.1.6
- TypeScript
- Tailwind CSS

### バックエンド
- Ruby 3.2.5
- Ruby on Rails 8.0.1
- MySQL 8.0

## 必要要件

- Docker
- Docker Compose

## プロジェクト構成
```
my-blog/
├── frontend/          # Next.jsアプリケーション
├── backend/           # Rails APIアプリケーション
├── docker-compose.yml # Docker設定
└── .env              # 環境変数
```

## セットアップ手順

1. リポジトリのクローン
```bash
git clone https://github.com/Tatsuki-Otake/my-blogs.git
cd my-blog
```

2. 環境変数の設定
```bash
# .envファイルを作成
cp .env.example .env
```

3. Dockerコンテナのビルドと起動
```bash
# イメージのビルド
docker-compose build

# コンテナの起動
docker-compose up -d
```

4. データベースの設定
```bash
# マイグレーションの実行
docker-compose exec backend rails db:migrate

# シードデータの投入
docker-compose exec backend rails db:seed
```

## 動作確認
- フロントエンド: http://localhost:3001
- バックエンドAPI: http://localhost:3000
- データベース: localhost:3306

## 開発用コマンド
```bash
# コンテナの状態確認
docker-compose ps

# ログの確認
docker-compose logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# コンテナの停止
docker-compose down

# コンテナとボリュームの削除
docker-compose down -v

# BE
# フロントエンドコンテナを除外してバックエンドとDBのみ起動
docker-compose up -d db backend
# ログを確認する場合
docker-compose logs -f backend

## FE
cd frontend
npm install
npm run dev
```

## API エンドポイント
- rails s
### 記事関連

- GET /api/v1/articles - 記事一覧の取得
```bash
curl http://localhost:3000/api/v1/articles
```
- GET /api/v1/articles/:id - 記事詳細の取得
```bash
curl http://localhost:3000/api/v1/articles/1
```
- POST /api/v1/articles - 記事の作成
```bash
curl -X POST http://localhost:3000/api/v1/articles \
     -H "Content-Type: application/json" \
     -d '{"article": {"title": "new article", "content": "new article content"}}'
```
- PATCH /api/v1/articles/:id - 記事の更新
```bash
curl -X PATCH http://localhost:3000/api/v1/articles/1 \
     -H "Content-Type: application/json" \
     -d '{"article": {"title": "updated article", "content": "updated article content"}}'
```
- DELETE /api/v1/articles/:id - 記事の削除
```bash
curl -X DELETE http://localhost:3000/api/v1/articles/1
```

### 認証関連

- POST /api/v1/auth/sign_in - ログイン
```bash
curl -X POST http://localhost:3000/api/v1/auth/sign_in \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "password"}'
```
- DELETE /api/v1/auth/sign_out - ログアウト
```bash
curl -X DELETE http://localhost:3000/api/v1/auth/sign_out
```
- POST /api/v1/auth - ユーザー登録
```bash
curl -X POST http://localhost:3000/api/v1/auth \
     -H "Content-Type: application/json" \
     -d '{"email": "newuser@example.com", "password": "newpassword", "password_confirmation": "newpassword"}'
```

## ディレクトリ構造
```
frontend/
├── src/
│   ├── app/          # ページコンポーネント
│   ├── components/   # 共通コンポーネント
│   └── styles/       # スタイルシート
│
backend/
├── app/
│   ├── controllers/  # コントローラー
│   ├── models/       # モデル
│   └── views/        # ビュー（API用）
├── config/          # 設定ファイル
└── db/             # データベース関連
```

### 注意事項

- 開発環境ではフロントエンドのホットリロードが有効
- バックエンドのコード変更は自動で反映
- データベースのデータは Docker ボリュームに永続化

### ライセンス
MIT

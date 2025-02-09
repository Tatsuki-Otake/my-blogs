FROM node:21-slim

WORKDIR /app

# パッケージインストールの最適化
COPY package*.json ./
RUN npm ci

# ソースコードのコピー
COPY . .

# Next.jsの開発サーバーのポートを公開
EXPOSE 3001

# 開発サーバー起動
CMD ["npm", "run", "dev"]

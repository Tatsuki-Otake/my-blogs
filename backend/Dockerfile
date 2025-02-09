FROM ruby:3.2.5-slim

# 必要なパッケージのインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    git \
    curl \
    netcat-traditional && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# 作業ディレクトリの設定
WORKDIR /app

# GemfileとGemfile.lockをコピー
COPY Gemfile Gemfile.lock ./

# Bundlerのバージョン指定とインストール
RUN gem install bundler:2.5.23

# Bundle installの実行
RUN bundle install

# アプリケーションのコピー
COPY . .

# コンテナ起動時のエントリーポイントを設定
COPY ./bin/docker-entrypoint /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint

# ポート3000を公開
EXPOSE 3000

# エントリーポイントの設定
ENTRYPOINT ["docker-entrypoint"]

# Rails サーバー起動
CMD ["rails", "server", "-b", "0.0.0.0"]

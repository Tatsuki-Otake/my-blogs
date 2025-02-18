class Api::V1::ArticlesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_article, only: [:show, :update, :destroy]

  def index
    articles = Article.all
    render json: articles
  end

  def show
    render json: @article
  end

  def create
    article = current_user.articles.new(article_params)
    if article.save
      render json: article, status: :created
    else
      render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @article.user == current_user
      if @article.update(article_params)
        render json: @article
      else
        render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "権限がありません" }, status: :forbidden
    end
  end

  def destroy
    if @article.user == current_user
      @article.destroy
      head :no_content
    else
      render json: { error: "権限がありません" }, status: :forbidden
    end
  end

  private

  def set_article
    @article = Article.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Article not found" }, status: :not_found
  end

  def article_params
    params.require(:article).permit(:title, :content)
  end
end

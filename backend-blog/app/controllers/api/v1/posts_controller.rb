module Api
  module V1

    class PostsController < Api::V1::ApplicationController

      include Authentication

      before_action :authenticate_user!, only: [:create, :update, :like_dislike, :show, :destroy]

      def index
        # current_user = find_current_user
        @posts = Post.all
        render json: @posts
      end
      
      def create
        current_user = find_current_user
        @post = Post.new(post_params)
        @post.user_id = current_user.id
        @post.like = 1
        if @post.save
          render json: {post: @post, message: "New Blog Created"}
        else
          render json: {errors: @post.errors.full_messages}
        end
      end

      def update
        post
        if post.update(post_params)
          render json: post, status: :ok
        else
          render json: { error: post.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def like_dislike
        post
        return render json: { error: 'Post not found' }, status: :not_found unless post

        action_type = request.headers['Like-Dislike']

        if action_type == 'like'
          post.update(like: post.like + 1)
        else
          post.update(like: post.like - 1)
        end  
      end

      def show
        post
        if post
          render json: post, serializer: PostSerializer
        else
          render json: { error: 'Post not found' }, status: :not_found
        end
      end

      def destroy
        post
        if post.destroy
          render json: { message: 'Post deleted successfully' }, status: :ok
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end

      def delete_like
        current_user_id = find_current_user.id
        post_id = params[:post_id]
        post = Post.find_by(id: post_id)
        likes = post.likes.where(user_id: current_user_id)

        if likes.exists?
          likes.destroy_all
          render json: { message: "Unliked" }
        else
          render json: { error: "Error" }
        end
      end

      private

      def post_params
        params.require(:post).permit(:title, :content)
      end

      def post
        post ||= Post.find_by(id: params[:id])
      end
    end

  end
end

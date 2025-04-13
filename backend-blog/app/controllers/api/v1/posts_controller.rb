module Api
  module V1

    class PostsController < Api::V1::ApplicationController

      include Authentication

      def index
        @posts = Post.all
        render json: {posts: @posts}, include: :user 
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
        post = Post.find_by(id: params[:id])
        return render json: { error: 'Post not found' }, status: :not_found unless post

        action_type = request.headers['Like-Dislike']

        if action_type == 'like'
          post.update(like: post.like + 1)
        else
          post.update(like: post.like - 1)
        end
        # binding.pry  
      end
      private

      def post_params
        params.require(:post).permit(:title, :content)
      end

    end

  end
end

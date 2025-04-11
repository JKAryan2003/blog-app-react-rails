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
        
        if @post.save
          render json: {post: @post, message: "New Blog Created"}
        else
          render json: {errors: @post.errors.full_messages}
        end
      end

      private

      def post_params
        params.require(:post).permit(:title, :content)
      end

    end

  end
end

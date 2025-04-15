module Api
  module V1
    class UsersController < Api::V1::ApplicationController
      
      before_action :authenticate_user!, only: [:my_post]

      include Authentication
      
      def my_post
        @my_posts = Post.where(user_id: params[:user_id])
        render json: @my_posts, each_serializer: PostSerializer
      end

    end
  end
end

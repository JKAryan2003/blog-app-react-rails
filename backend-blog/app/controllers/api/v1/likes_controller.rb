module Api
  module V1

    class LikesController < Api::V1::ApplicationController

      include Authentication

      def create
        current_user_id = find_current_user.id
        post_id = params[:post_id]
        @like = Like.new(user_id: current_user_id, post_id: post_id.to_i)
        if @like.save
          render json: {like: @like, message: "New like added"}
        else
          render json: {errors: @like.errors.full_messages}
        end
      end

      
    end

  end
end
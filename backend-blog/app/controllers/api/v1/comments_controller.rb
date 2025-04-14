module Api
  module V1

    class CommentsController < Api::V1::ApplicationController

      include Authentication

      def create
        @comment = Comment.new(comment_params)  
        @comment.user = current_user
        @comment.post_id = params[:post_id]
        if @comment.save
          render json: {comment: @comment, message: "Comment added"}
        else
          render json: {errors: @comment.errors.full_messages}
        end
      end

      private
      def comment_params
        params.require(:comment).permit(:content)
      end

    end

  end
end
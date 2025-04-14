module Api
  module V1

    class CommentsController < Api::V1::ApplicationController

      include Authentication

      def index 
        @comments = Comment.all
        render json: @comments, each_serializer: CommentSerializer
      end

      def create
        current_user = find_current_user
        @comment = Comment.new(comment_params)  
        @comment.user = current_user
        @comment.post_id = params[:comment][:post_id]
        # binding.pry
        if @comment.save
          render json: {comment: @comment, message: "Comment added"}
        else
          render json: {errors: @comment.errors.full_messages}
        end
      end

      private
      def comment_params
        params.require(:comment).permit(:content, :post_id)
      end

    end

  end
end
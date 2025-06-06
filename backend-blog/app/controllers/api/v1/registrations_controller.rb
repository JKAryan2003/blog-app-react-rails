module Api
  module V1
    class RegistrationsController < Api::V1::ApplicationController

      include Authentication

      before_action :authenticate_user!, only: [:index]

      def index
        @users = User.all 
        render json: @users, each_serializer: UserSerializer
      end

      def create
        @user = User.new(user_params)
        if @user.save
          render json: {user: @user, message: "User Created Succesfully"}
        else
          render json: {errors: @user.errors.full_messages}
        end
      end

      private

      def user_params
        params.require(:user).permit(:username, :email, :password)
      end

    end
  end
end
module Api
  module V1
    class SessionsController < Api::V1::ApplicationController

      def create
        @user = User.find_by(email: params[:user][:email])
        if @user && @user.authenticate(params[:user][:password])   
          token = JsonWebToken.encode({user_id: @user.id})
          render json: {user: @user, token: token}
        else
          render json: {errors: "Invalid Credentials"}, status: :unauthorized
        end
      end

    end
  end
end
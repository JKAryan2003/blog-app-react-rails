module Api
  module V1
    class SessionsController < Api::V1::ApplicationController

      def create
        @user = User.find_by(email: params[:user][:email])
        
        if @user && @user.authenticate(params[:user][:password])   
          salt = SecureRandom.hex(16)
          
          payload = {
            user_id: @user.id,
            email: @user.email,
            salt: salt 
          }
          token = JsonWebToken.encode(payload)

          AllowList.create(
            token: token,
            salt: salt
          )

          render json: {user: @user, token: token, message: "Logged in successfully"}
        else
          render json: {errors: "Invalid Credentials"}, status: :unauthorized
        end
      end

    end
  end
end
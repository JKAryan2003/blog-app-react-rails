module Authentication
  extend ActiveSupport::Concern

  def delete_allowed_token(header)
    if header
      token = header.split(' ').last
      allowed_token = AllowList.find_by(token: token)
      if allowed_token
        allowed_token.destroy
        render json: { message: 'Logout successfully' }, status: :ok
      else
        render json: { error: 'Token not found' }, status: :unauthorized
      end
    else
      render json: { error: 'No token provided' }, status: :unauthorized
    end
  end
  
end
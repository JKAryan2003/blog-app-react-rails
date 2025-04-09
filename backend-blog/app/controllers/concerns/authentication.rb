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

  def authenticate_user!
    header = request.headers['Authorization']
    if header
      token = header.split(' ').last
      if token.nil?
        return render json: { error: 'Unauthorized' }, status: :unauthorized
      end

      decoded_token = JsonWebToken.decode(token)
      if decoded_token.nil?
        return render json: { error: 'Unauthorized' }, status: :unauthorized
      end
      
      @current_user = User.find_by(id: decoded_token[:user_id])
      if @current_user.nil?
        return render json: { error: 'User not found' }, status: :unauthorized
      end

      allow_list_entry = AllowList.find_by(token: token)
      if allow_list_entry.nil? || allow_list_entry.expires_at < Time.current
        render json: { error: 'Token has expired' }, status: :unauthorized
      end
    else
      return render json: { error: 'You need to log in first' }, status: :unauthorized
    end

  end
end
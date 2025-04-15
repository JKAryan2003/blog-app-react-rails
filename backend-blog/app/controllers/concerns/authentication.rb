module Authentication
  extend ActiveSupport::Concern

  class TokenError < StandardError; end

  def delete_allowed_token(header)
    
    raise TokenError.new "No Token Provided", status: :unauthorized unless header

    token = header.split(' ').last
                                                           
    allowed_token = AllowList.find_by(token: token)
    raise TokenError.new "Token Not found", status: :unauthorized unless allowed_token
   
    allowed_token.destroy
    render json: { message: 'Logout successfully' }, status: :ok

  end

  def authenticate_user!
    find_header
    
    if decode_token == false
      false 
    end

    find_current_user

    token = extract_token

    allow_list_entry = AllowList.find_by(token: token)
    if allow_list_entry.nil? || allow_list_entry.expires_at < Time.current
      render json: { error: 'Token has expired' }, status: :unauthorized
    end
   
  end

  def find_header
    header = request.headers['Authorization']
    return render json: { error: 'You need to log in first' }, status: :unauthorized unless header

    header
  end  

  def extract_token
    header = find_header
    header.split(' ').last
  end

  def decode_token
    header = find_header
    
    token = header.split(' ').last

    if token.blank?
      false
    end

    if token.nil?
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    decoded_token = JsonWebToken.decode(token)
    if decoded_token.nil?
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end
    decoded_token
  end

  def find_current_user
    decoded_token = decode_token
    @current_user = User.find_by(id: decoded_token[:user_id])
    if @current_user.nil?
      return render json: { error: 'User not found' }, status: :unauthorized
    end
    @current_user
  end

end
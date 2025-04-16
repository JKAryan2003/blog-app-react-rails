module Authentication
  extend ActiveSupport::Concern

  class TokenError < StandardError; end

  def delete_allowed_token(header)
    
    raise TokenError, "No Token Provided", status: :unauthorized unless header

    token = header.split(' ').last
                                                           
    allowed_token = AllowList.find_by(token: token)
    raise TokenError, "Token Not found", status: :unauthorized unless allowed_token
   
    allowed_token.destroy
    render json: { message: 'Logout successfully' }, status: :ok

  end

  def is_token_passed?
    header = request.headers['Authorization']
    return false if header.blank?
    return true
  end

  def authenticate_user!
    find_header
    decode_token
    find_current_user

    token = extract_token

    allow_list_entry = AllowList.find_by(token: token)
    raise TokenError, "Token has expired" if allow_list_entry.nil? || allow_list_entry.expires_at < Time.current
   
  end

  def find_header
    header = request.headers['Authorization']
    raise TokenError, "You need to log in first" unless header

    header
  end  

  def extract_token
    header = find_header
    token = header.split(' ').last
    raise TokenError, "Invalid token" if token.blank?
    token
  end

  def decode_token
    token = extract_token
    decoded_token = JsonWebToken.decode(token)
    raise TokenError, "Unauthorized" unless decoded_token
    decoded_token
  end

  def find_current_user
    decoded_token = decode_token
    current_user = User.find_by(id: decoded_token[:user_id])
    raise TokenError, "User not found" unless current_user
    current_user
  end

end
class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at, :like, :liked_by_user

  belongs_to :user

  def liked_by_user
    current_user = instance_options[:current_user]
    return false unless current_user
    object.likes.exists?(user_id: current_user.id)
  end

end

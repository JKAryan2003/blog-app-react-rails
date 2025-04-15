class AddLikeByCurrentUserToPost < ActiveRecord::Migration[7.2]
  def change
    add_column :posts, :like_by_current_user, :boolean
  end
end

class AddLikeToPost < ActiveRecord::Migration[7.2]
  def change
    add_column :posts, :like, :integer
  end
end

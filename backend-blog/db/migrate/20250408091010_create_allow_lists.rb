class CreateAllowLists < ActiveRecord::Migration[7.2]
  def change
    create_table :allow_lists do |t|
      t.string :token
      t.datetime :expires_at
      t.string :salt
      t.timestamps
    end
  end
end

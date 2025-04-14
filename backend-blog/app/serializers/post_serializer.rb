class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at, :like

  belongs_to :user
end

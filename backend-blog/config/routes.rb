Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    namespace :v1 do
      resources :registrations, only: [:index, :create] 
      resources :sessions, only: [:create, :logout]
      post '/logout', to: 'sessions#logout'

      resources :posts, only: [:index, :create, :update, :show, :destroy]
      patch '/like_dislike/:id', to: 'posts#like_dislike'
      resources :comments, only: [:index, :create]

      resources :users do
        get '/my_post', to: 'users#my_post' 
      end
    end
  end
end

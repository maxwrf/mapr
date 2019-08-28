Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/test", to: 'plans#tsm'

  resources :plans, only: [:index] do
    # see carl first if think need to edit below
    resources :activities, only: [ :index ]
    namespace :api, defaults: { format: :json } do
      namespace :v1 do
        resources :activities, only: [ :index ]
      end
    end
  end
>>>>>>> 05499f3121a46fc292c2692b03b88ce9a0d14b79
end

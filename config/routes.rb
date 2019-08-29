Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :plans, only: [:index] do
    # see carl first if think need to edit below
    resources :activities, only: [ :index ]
    namespace :api, defaults: { format: :json } do
      namespace :v1 do
        resources :activities, only: [ :index ]
        post 'shortlist/save', to: "activities#save_shortlist"
      end
    end
  end
end

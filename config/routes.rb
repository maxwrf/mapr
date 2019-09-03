Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # only for development purposes(max) -- delete for production
  get '/test', to: 'plans#algorithm'

  resources :plans, only: [:index, :new, :create, :edit, :update, :show] do
    member do
      patch '/update_categories', to: 'plans#update_categories'
    end
    # see carl first if think need to edit below
    get '/edit_categories', to: 'plans#edit_categories'
    # patch "/update_categories", to: 'plans#update_categories'

    resources :activities, only: [ :index ]
    namespace :api, defaults: { format: :json } do
      namespace :v1 do
        resources :activities, only: [ :index]
        get 'details', to: 'activities#details'
        get 'search', to: 'activities#search'
        post 'shortlist/save', to: 'activities#save_shortlist'
      end
    end
  end
end

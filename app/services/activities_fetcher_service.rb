require 'faker' # dev
require 'json'  # dev

class ActivitiesFetcherService
  def initialize
    @test = 1
  end

  def fetch(num_activities, params)
    #binding.pry
    if params[:src] == 'gnear'
      api_fetcher = GplaceFetcherService.new # TODO: old method, remove this when sure won't use
    else
      api_fetcher = GplaceTextFetcherService.new
    end
    activities = api_fetcher.fetch(num_activities, params)
    already_in_db = Activity.where(plan_id: params[:plan_id])
    activities.each do |activity|
      if already_in_db.find_by(place_id: activity[:place_id])
        p "NOT SAVING - already in db"
      else
        activity.plan_id = params[:plan_id]
        activity.save!
      end
    end
  end

  private

  def generate_test_activity(num)
    results = []
    num.times do
      results << { name: Faker::App.name,
                   address: Faker::Address.street_address,
                   description: Faker::Books::Dune.saying }
    end
    results
  end
end

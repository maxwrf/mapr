# BROWSER activities controller - not api
class ActivitiesController < ApplicationController
  skip_before_action :authenticate_user!, only: :index
  def index
    # e.g. localhost:3000/plans/1/activities
    @activities = policy_scope(Activity)
    fetcher = ActivitiesFetcherService.new
    @activities = fetcher.fetch(5, params)
    @categories = ['parks', 'museums', 'art galleries', 'aqauriums', 'berlin wall', 'shopping centres', 'shopping', 'wildlife']
  end
end

# API activities controller - not browser

class Api::V1::ActivitiesController < Api::V1::BaseController
  def index
    # e.g. url http://localhost:3000/plans/1/api/v1/activities
    @activities = policy_scope(Activity)
    fetcher = ActivitiesFetcherService.new
    @activities = fetcher.fetch(5)
  end
end

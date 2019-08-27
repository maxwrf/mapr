# e.g. url http://localhost:3000/plans/1/api/v1/activities

class Api::V1::ActivitiesController < Api::V1::BaseController
  def index
    @activities = policy_scope(Activity)
  end
end

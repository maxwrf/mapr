# API activities controller - not browser

class Api::V1::ActivitiesController < Api::V1::BaseController
  def index
    # e.g. url http://localhost:3000/plans/1/api/v1/activities
    @activities = policy_scope(Activity)
    fetcher = ActivitiesFetcherService.new
    @activities = fetcher.fetch(5, params)
    render json: @activities
  end

  def save_shortlist
    @activity = Activity.new
    authorize @activity
    p "RECEIVED PARAMS = #{params}"
    body = JSON.parse(request.raw_post)
    p "RECEIVED BODY = #{body}"
    already_in_db = Activity.where(plan_id: params[:plan_id])
    already_in_db.each do |activity|
      p activity[:id]
      body.each do |shortlist|
      end
    end


    render json: {welcome: "hello"}
  end
end

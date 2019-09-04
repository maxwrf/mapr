# API activities controller - not browser

class Api::V1::ActivitiesController < Api::V1::BaseController
  def index
    # e.g. url http://localhost:3000/plans/1/api/v1/activities
    @activities = policy_scope(Activity)
    fetcher = ActivitiesFetcherService.new
    @activities = fetcher.fetch(params).sort { |a, b|  b[:average_rating] <=> a[:average_rating] }
    html = render_to_string partial: 'activities/activity_cards.html.erb', locals: { activities: @activities }
    render json: { activities: @activities, html: html }

    # option instead of json...
    #
  end

  def details
    @activity = Activity.new
    authorize @activity
    fetcher = ActivitiesFetcherService.new
    params[:action] = 'details'
    details = fetcher.fetch(params)
    html = render_to_string partial: 'activities/activity_details.html.erb', locals: { data: details }
    render json: { details: details, html: html }
  end

  def search
    @activity = Activity.new
    authorize @activity
    fetcher = ActivitiesFetcherService.new
    params[:action] = 'find_place'
    @activities = fetcher.fetch(params)
    html = render_to_string partial: 'activities/activity_cards.html.erb', locals: { activities: @activities }
    render json: { activities: @activities, html: html }
    # render json: { activities: 'aaa', html: 'bbb' }
  end

  def save_shortlist
    # IMPORTANT! once saved further saves are UNRELIABE.
    # Beause saving detroys all activities not on the shortlist, further
    # activities added in the front-end are missing from the backend db,
    # UNLESS the further api requests have repopulated those records
    #
    # SOLUTION a) [current] allow only one save per page load (i.e.
    # saving takes to a different page)
    @activity = Activity.new
    authorize @activity
    body = JSON.parse(request.raw_post)
    already_in_db = Activity.where(plan_id: params[:plan_id])
    initial_count = already_in_db.count
    deleted = 0
    preserved = 0
    already_in_db.each do |activity|
      p activity[:id]
      on_shortlist = false
      body.each do |shortlisted_place_id|
        on_shortlist = true if activity[:place_id] == shortlisted_place_id
      end
      activity.destroy if on_shortlist == false
      preserved += 1 if on_shortlist == true
      deleted += 1 if on_shortlist == false
    end
    p "RECEIVED PARAMS = #{params}"
    p "RECEIVED BODY = #{body}"
    p "INITLAL COUNT = #{initial_count}"
    p "DELETED = #{deleted}"
    p "PRESERVED = #{preserved}"
    render json: { status: "Destoyed", plan_id: params[:plan_id] }
  end
end

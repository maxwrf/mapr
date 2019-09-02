# BROWSER activities controller - not api
class ActivitiesController < ApplicationController
  skip_before_action :authenticate_user!, only: :index
  def index
    @activities = policy_scope(Activity)
    @already_saved = Activity.where(plan_id: params[:plan_id])
    # TODO: this will still be populated with old api results if
    # shortlist was NOT SAVED (which clears non-shortlited items
    # in the process)

    # EITHER need to clear the db now... = losing shortlist if
    # return to page
    ActiveRecord::Base.logger.silence do
      @already_saved.destroy_all
    end

    # OR some method of cleanup, i.e. could additionally marked
    # saved with a 'saved=true' and delete those that don't have
    # at this stage (before loading page)
    # ...<here>

    plan = Plan.find(params[:plan_id])
    @categories = plan[:categories].split(',')
    @categories.delete_at(0) #correction for initial comma in list
  end
end

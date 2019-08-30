require 'json' # dev

class ActivitiesFetcherService
  def fetch(num_activities, params)
    api_fetcher = case params[:src]
    when 'gnear'
      GplaceFetcherService.new
    else
      GplaceTextFetcherService.new # default
    end

    activities = api_fetcher.fetch(num_activities, params)
    already_in_db = Activity.where(plan_id: params[:plan_id])
    #binding.pry
    activities.each do |activity|
      p "INITIAL COUNT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! = #{already_in_db.count}"
        if already_in_db.find_by(place_id: activity[:place_id])
          p "NOT SAVED - already in db"
        else
          p "SAVING... new item (for this plan)"
          activity.plan_id = params[:plan_id]
          activity.save!
        end
      end
    end
end

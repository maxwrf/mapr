class ActivitiesFetcherService
  def fetch(params)
    case params[:action]
    when 'details'
      api_fetcher = GplaceDetailsService.new
      return api_fetcher.fetch(params)
    when 'find_place'
      api_fetcher = GplaceFindPlaceService.new
    else # default if multi-result fetch
      api_fetcher = case params[:src]
      when 'gnear'
        GplaceFetcherService.new
      else
        GplaceTextFetcherService.new # default
      end
    end
    activities = api_fetcher.fetch(params)
    already_in_db = Activity.where(plan_id: params[:plan_id])
    ActiveRecord::Base.logger.silence do
      activities.each do |activity|
        if already_in_db.find_by(place_id: activity[:place_id])
          # p "NOT SAVED - already in db"
        else
          # p "SAVING... new item (for this plan)"
          activity.plan_id = params[:plan_id]
          activity.save!
        end
      end
    end
    return activities
  end
end

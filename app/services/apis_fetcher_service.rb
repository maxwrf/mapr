# PARAMS should be universal for all possible apis
# it'S the job of the string builder to map to google spec

class ApisFetcherService
  def fetch(params)
    query_url = build_query_url(params)
    p "=====> build_query_url (DONE)"
    p query_url
    api_response = fetch_from_api(query_url)
    p "=====> fetch_from_api (DONE)"
    results = build_app_data(api_response)
    p "=====> api_response_to_activities (DONE)"
    results
  end

  private

  def build_query_url(params)
    "#{@BASE_API_URL}#{build_param_string(params)}"
  end

  def build_param_string(params)
    @api_params = []
    map_params(params)
    @api_params.join('&')
  end

  # DEPRECATED - REMOVE ONCE CONFIRMED NOT IN USE
  def map_city_to_lat_lng(city)
    city = 'berlin' if city.nil?
    value = case city.downcase
            when 'berlin'
              '52.52,13.4050'
            when 'london'
              '51.5074,0.1278'
            when 'paris'
              '48.8566,2.3522'
            end
    value
  end

  def get_coord_string(params)
    plan = Plan.find(params[:plan_id])
    "#{plan[:latitude]},#{plan[:longitude]}"
  end

  # CHILD METHODS ---------
  # def api_response_to_activities(res)
  # end

  # def fetch_from_api(url)
  # end

  # def map_params(params)
  # end

  # def map_category_params(params)
  # end
end

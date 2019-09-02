# PARAMS should be universal for all possible apis
# it'S the job of the string builder to map to google spec

class ApisFetcherService
  def fetch(num_results, params)
    query_url = build_query_url(params)
    api_response = fetch_from_api(query_url)
    results = api_response_to_activities(api_response)
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

  # OVERRIDEN ---------
  def api_response_to_activities(res)
  end

  def fetch_from_api(url)
  end

  def map_params(params)
  end

  def map_category_params(params)
  end

  def map_location_params(params)
  end
  # OVERRIDEN END ---------
end

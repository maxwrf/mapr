require 'open-uri' # MUST include else cause 500. ??? not clear why?

# PARAMS should be universal for all possible apis
# it's the job of the string builder to map to google spec

class GplaceDetailsService < ApisFetcherService
  def initialize
    @BASE_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json?'
  end

  private

  def build_app_data(res)
    res['result']
  end

  def fetch_from_api(url)
    res = JSON.parse(open(url).read)
    # TODO: better error handling
    if res.nil?
      p 'Google Places (Place Details) api call failed => empty reponse'
      return -1
    elsif res['status'] == 'INVALID_REQUEST'
      p "Google Places (Place Details) api call failed => #{res['status']}"
      return -1
    end

    res
  end

  def map_params(params)
    @api_params << "key=#{ENV['GOOGLE_API_KEY']}"
    @api_params << "placeid=#{params[:place_id]}"
    @api_params << 'fields=name,photo,opening_hours,price_level,rating,review'
  end
end

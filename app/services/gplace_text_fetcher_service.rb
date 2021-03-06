require 'open-uri' # MUST include else cause 500. ??? not clear why?

# PARAMS should be universal for all possible apis
# it's the job of the string builder to map to google spec

class GplaceTextFetcherService < ApisFetcherService
  def initialize
    @BASE_API_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
  end

  private

  def build_app_data(res)
    activities = []
    res['results'].each_with_index do |item, ind|
      details = {
        name: item['name'],
        average_rating: item['rating'].to_f,
        address: item['formatted_address'],
        longitude: item['geometry']['location']['lng'],
        latitude: item['geometry']['location']['lat'],
        place_id: item['place_id']
      }
      # not all activities have photo data, if they do it's inside single ele array
      details[:image_ref] = item['photos'][0]['photo_reference'] if item['photos']
      activities << Activity.new(details)
    end
    activities
  end

  def fetch_from_api(url)
    res = JSON.parse(open(url).read)
    if res.nil?
      p 'Google Places (Text Search) api call failed => empty reponse'
      return -1
    elsif res['status'] != 'OK'
      p "Google Places (Text Search) api call failed => #{res['status']}"
      return -1
    end
    res
  end

  def map_params(params)
    @api_params << map_category_params(params)
    @api_params << "key=#{ENV['GOOGLE_PLACES_API_BACKEND_KEY']}"
    @api_params << 'radius=2000' # TODO: how we doing this?
    @api_params << "location=#{get_coord_string(params)}"
  end

  def map_category_params(params)
    value = 'attractions'
    value = params[:q] if params[:q]
    "query=#{value}"
  end

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
end

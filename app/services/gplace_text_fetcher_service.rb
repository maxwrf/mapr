require 'open-uri' # MUST include else cause 500. ??? not clear why?

# PARAMS should be universal for all possible apis
# it's the job of the string builder to map to google spec

class GplaceTextFetcherService < ApisFetcherService
  def initialize
    @BASE_API_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
  end

  private

  def api_response_to_activities(res)
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
    if res['results'].empty?
      # TODO: been an error - do something better!
      p "Google places api call failed => #{res['status']}"
      return -1
    end
    res
  end

  def map_params(params)
    @api_params << map_category_params(params)
    @api_params << "key=#{ENV['GOOGLE_API_KEY']}"
    @api_params << 'radius=2000' # TODO: how we doing this?
    @api_params << map_location_params(params)
  end

  def map_category_params(params)
    value = 'attractions'
    value = params[:q] if params[:q]
    "query=#{value}"
  end

  def map_location_params(params)
    params[:city] = 'berlin' if params[:city].nil?
    value = case params[:city]
            when 'berlin'
              '52.52,13.4050'
            when 'london'
              '51.5074,0.1278'
            when 'paris'
              '48.8566,2.3522'
            end
    "location=#{value}"
  end
end

# # require 'faker' # dev
# require 'json'  # dev
# require 'open-uri'
# # require 'httplog' # dev. MUST be after open-uri

# PARAMS should be universal for all possible apis
# it'S the job of the string builder to map to google spec

class GplaceFetcherService < ApisFetcherService
  def initialize
    @BASE_API_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
  end

  private

  def api_response_to_activities(res)
    activities = []
    res['results'].each do |item|
      details = {
        name: item['name'],
        average_rating: item['rating'].to_f,
        address: item['vicinity']
      }
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
    @api_params << "key=#{ENV['GOOGLE_API_KEY']}"
    @api_params << 'radius=10000' #TODO: how we doing this?
    #@api_params << 'type=museum' # too restrictive, prefer keyword    @api_params << map_location_params(params)
    @api_params << map_location_params(params)
    @api_params << map_category_params(params)
  end

  def map_category_params(params)
    value = ''
    if params[:cat]
      value = case params[:cat]
              when 'museums_contemporary'
                'history museum'
              when 'museums_history'
                'art museum'
              when 'parks_forest'
                'science museum'
              when 'test_a'
                'park'
              when 'test_b'
                'science museum'
              when 'test_c'
                'contemporary art gallery'
              end
    end
    "keyword=#{value}"
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

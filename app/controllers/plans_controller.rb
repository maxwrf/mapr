require 'json'
require 'open-uri'
# require 'matrix'

class PlansController < ApplicationController
  def algorithm(sights, travel_mode)
    @travel_matrix = TravelMatrix.generate(sights, travel_mode)
    ts = TravellingSalesman.run(sights, @travel_matrix)
    @record_distance = ts[:record_distance]
    return ts[:best_ever]
  end

  def show
    @plan = Plan.find(params[:id])
    authorize @plan
    activities = @plan.activities
    coords = activities.map { |e| [e.latitude, e.longitude] }

    # retrieve travel mode
    # options are [driving, walking, bicycling, transit] something else breaks google api
    travel_mode = "walking" if @plan.permit_walk
    travel_mode = "driving" if @plan.permit_car
    travel_mode = "bicycling" if @plan.permit_cycle
    travel_mode = "transit" if @permit_public_transport

    # look up coordinates for start and finish address
    coords.unshift(Geocoder.search("Vinetastraße 6, Berlin").first.coordinates)
    coords.push(Geocoder.search("Ernst-Thälmann-Park, 10405 Berlin, Germany").first.coordinates)

    # let the algorithm do the work
    order = algorithm(coords, travel_mode)
    min_coords = order.map { |e| coords[e] }

    # SOMEHOW SEND THE travel_mode TO THE FRONT END it is currently set to cycle

    # set the markers and they are in correct order now!
    @markers = min_coords.map do |e|
      {
        lat: e[0],
        lng: e[1]
      }
    end
  end
end

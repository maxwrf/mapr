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

  def create
    @plan = Plan.new(plan_params)
    authorize @plan

    @user = current_user
    @plan.user = @user
    @plan.end_date_time = @plan.start_date_time
    @plan.save
    if @plan.save
      redirect_to edit_plan_path(@plan)
    else
      render 'pages/home'
    end
  end

  def edit
    @plan = Plan.find(params[:id])
    authorize @plan
  end

  def update
    @plan = Plan.find(params[:id])
    authorize @plan
    if @plan.update(plan_params_edit)
      redirect_to test_path
    else
      render :edit
    end
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

  private

  def plan_params
    params.require(:plan).permit(:city, :start_date_time, :number_adults, :number_children)
  end

  def plan_params_edit
    params.require(:plan).permit(:permit_walk, :permit_cycle, :permit_car, :permit_public_transport,
      :stat_date_time, :end_date_time, :start_address, :end_address)
  end
end

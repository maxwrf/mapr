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
    @break = Break.new
    authorize @plan
  end

  def update
    @plan = Plan.find(params[:id])
    authorize @plan
    if @plan.update(plan_params_edit)
      redirect_to plan_edit_categories_path(@plan)
    else
      render :edit
    end
  end

  def edit_categories
    @plan = Plan.find(params[:plan_id])
    authorize @plan
  end

  def update_categories
    @plan = Plan.find(params[:id])
    authorize @plan
    if @plan.update(category_params)
      redirect_to plan_activities_path(@plan)
    else
      render :edit_categories
    end
  end

  def show
    @plan = Plan.find(params[:id])
    authorize @plan
    activities = @plan.activities
    coords = activities.map { |e| [e.latitude, e.longitude] }

    # retrieve travel mode
    # options are [driving, walking, bicycling, transit] something else breaks google api
    # @travel_mode = "walking" if @plan.permit_walk
    # @travel_mode = "driving" if @plan.permit_car
    # @travel_mode = "bicycling" if @plan.permit_cycle
    # @travel_mode = "transit" if @permit_public_transport
    @travel_mode = "transit"

    # look up coordinates for start and finish address
    coords.unshift(Geocoder.search(@plan.start_address).first.coordinates)
    coords.push(Geocoder.search(@plan.end_address).first.coordinates)

    # let the algorithm do the work
    order = algorithm(coords, @travel_mode)
    min_coords = order.map { |e| coords[e] }

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
      :start_date_time, :end_date_time, :start_address, :end_address,  breaks_attributes: [:preference_length, :preference_window_end, :preference_window_start])
  end

  def category_params
    params[:plan][:categories] = params[:plan][:categories].join(',')
    params.require(:plan).permit(:categories)
  end
  # def break_params
  #   params.require(:break).permit(:preference_length, :preference_window_end, :preference_window_start)
  # end
end

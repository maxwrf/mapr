require 'json'
require 'open-uri'
# require 'matrix'

class PlansController < ApplicationController
  def algorithm
    @plan = Plan.new
    authorize @plan
    sights = [[52.516207, 13.3760908], [52.5070031, 13.3890127], [52.4367962, 13.6324687], [52.4791258, 13.4398069], [52.5147146, 13.3797974]]
    travel_mode = "transit" # options are [driving, walking, bicycling, transit] something else breaks
    @travel_matrix = TravelMatrix.new.generate(sights, travel_mode)
    ts = TravellingSalesman.new.run(sights, @travel_matrix)
    @best_ever = ts[:best_ever]
    @record_distance = ts[:record_distance]
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

  def edit_categories
    @plan = Plan.find(params[:plan_id])
    authorize @plan
  end

  def update_categories
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

    # HERE ORDER THE ACTIVTIES IN THE OPTIMAL ORDER!!!!!
    # TO DO
    # IMORTANT

    @markers = activities.map do |act|
      {
        lat: act.latitude,
        lng: act.longitude
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

  def plan_params_edit_categories
    params.require(:plan).permit(:categories)
  end
end

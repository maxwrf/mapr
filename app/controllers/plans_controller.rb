require 'json'
require 'open-uri'
require 'matrix'

class PlansController < ApplicationController
  def algorithm
    @plan = Plan.new
    authorize @plan
    sights = [[52.516207, 13.3760908], [52.5070031, 13.3890127], [52.4367962, 13.6324687]]
    travel_mode = "transit" # options are [driving, walking, bicycling, transit] something else breaks
    @travel_matrix = TravelMatrix.new.generate(sights, travel_mode)
    ts = TravellingSalesman.new.run(sights)
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

  private

  def plan_params
    params.require(:plan).permit(:city, :start_date_time, :number_adults, :number_children)
  end
end

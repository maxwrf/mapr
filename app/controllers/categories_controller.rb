class CategoriesController < ApplicationController
  def edit
    @plan = Plan.find(params[:plan_id])
    authorize @plan
  end

  def update
    @plan = Plan.find(params[:id])
    authorize @plan
    if @plan.update(category_params)
      redirect_to plan_activities_path(@plan)
    else
      render :edit
    end
  end

private
  def category_params
    params.require(:plan).permit(category_list: [])
  end
end

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
end

require 'json'
require 'open-uri'
require 'matrix'

class PlansController < ApplicationController
  def algorithm
    @plan = Plan.new
    sights = [[52.516207, 13.3760908], [52.5070031, 13.3890127], [52.4367962, 13.6324687]]
    #travel_mode = transit # options are [driving, walking, bicycling, transit]
    authorize @plan
    times = Matrix.build(sights.length, sights.length) {|row, col| { start: sights[row], end: sights[col] } }
    times.each_with_index do |cell, row, col|
        #API CALL
      url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=#{cell[:start][0]},#{cell[:start][1]}&destinations=#{cell[:end][0]}%2C#{cell[:end][1]}&key=AIzaSyBOlf31U3nrHuWMj_pjtDcKCrhfG1RZHv0"
      serialized = open(url).read
      info = JSON.parse(serialized)
      times[row, col] = info["rows"][0]["elements"][0]["duration"]["value"]
    end
    @times = times
    # ts = TravellingSalesman.new
    # solution = ts.run(sights)
    # @best_ever = solution[:best_ever]
    # @record_distance = solution[:record_distance]
  end
end

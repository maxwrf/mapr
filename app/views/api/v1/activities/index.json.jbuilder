json.array! @activities do |activity|
  json.name activity[:name]
  json.description activity[:description]
  json.address activity[:address]
end

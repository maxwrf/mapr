# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

seeds = [{name: 'musuems', search_term: 'musuems', avg_visit_mins: 150},
         {name: 'art galleries', search_term: 'art galleries', avg_visit_mins: 120},
         {name: 'shopping', search_term: 'shopping centres', avg_visit_mins: 180},
         {name: 'stadiums', search_term: 'stadiums', avg_visit_mins: 100},
         {name: 'landmarks', search_term: 'landmarks', avg_visit_mins: 30},
         {name: 'parks', search_term: 'parks', avg_visit_mins: 180},
         {name: 'zoos', search_term: 'zoos', avg_visit_mins: 180},
         {name: 'amusement parks', search_term: 'amusement parks', avg_visit_mins: 300},
         {name: 'theaters', search_term: 'theaters', avg_visit_mins: 180}]

categories = Category.create(seeds)

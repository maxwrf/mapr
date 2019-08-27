require 'faker' # dev
require 'json'  # dev

class ActivitiesFetcherService
  def initialize
    @test = 1
  end

  def fetch(results)
    generate_test_activity(results)
  end

  def generate_test_activity(num)
    results = []
    num.times do
      results << { name: Faker::App.name,
                   address: Faker::Address.street_address,
                   description: Faker::Books::Dune.saying }
    end
  results
  end
end

class TravellingSalesman
  def run(sights)
  # sights = [[50.71, -50.23], [100.714, -100.234], [90.6, -90.9], [15.6, -4.9], [20.6, -20.9], [25.6, -30.9], [75.6, -40.9], [21.6, -20.9]]
  record_distance = Float::INFINITY
  best_ever = []
  current_best = []
  order = sights.each_with_index.map { |_e, i| i }
  # permutations = (1..sights.length).inject(:*) || 1
  # count = 0
  population = []
  population_size = 500
  fitness = []

  population_size.times do
    population << order.shuffle
  end

  100.times do
    # some loop
    results = calc_fitness(population, sights, record_distance, fitness, best_ever)
    fitness = results[:fitness]
    print results[:current_best]
    puts results[:current_record]
    if results[:record_distance] < record_distance
      best_ever = results[:best_ever]
      record_distance = results[:record_distance]
    end

    fitness = normalize_fitness(population, fitness)
    population = next_generation(population, fitness)

    # order = next_order(order)
    # break if order == "STOP"

    # count += 1
    # percent = 100 * count / permutations.to_f
    # puts "#{percent}% completed"
    # end of some loop
  end
  # print best_ever
  # puts record_distance
  { record_distance: record_distance, best_ever: best_ever }
  end

  private

  def calc_fitness(population, sights, record_distance, fitness, best_ever)
    current_record = Float::INFINITY
    current_best = []
    population.each_with_index do |orderpop, index|
      d = calc_distance(sights, orderpop)
      if d < record_distance
        record_distance = d
        best_ever = orderpop
      elsif d < current_record
        current_record = d
        current_best = population[index]
      end
      fitness[index] = 1 / (d**8 + 1)
    end
    { fitness: fitness, record_distance: record_distance, best_ever: best_ever, current_record: current_record, current_best: current_best }
  end

  def normalize_fitness(population, fitness)
    sum = 0
    population.each_with_index do |_orderpop, index|
      sum += fitness[index]
    end
    fitness.each_with_index do |score, index|
      fitness[index] = score / sum
    end
  end

  def next_generation(population,fitness)
    new_population = []
    population.each_with_index do |_orderpop, index|
      # new_population[index] = orderpop
      order_a = pick_one(population, fitness)
      order_b = pick_one(population, fitness)
      order = cross_over(order_a, order_b)
      new_population[index] = order
      mutate(order, 0.01)
    end
    new_population
  end

  def cross_over(order_a, order_b)
    start = rand(order_a.length)
    ending = rand((start + 1)..order_a.length)
    new_order = order_a.slice(start..ending)
    order_b.each do |i|
      sight = i
      if new_order.include?(sight) == false
        new_order.push(sight)
      end
    end
    return new_order
  end

  def pick_one(population,fitness)
    index = 0
    r = rand

    while r > 0
      r = r - fitness[index]
      index += 1
    end
    index -= 1
    population[index]
  end

  def mutate(order, mutation_rate)
    order.length.times do
      if rand < mutation_rate
        index_a = rand(order.length)
        index_b = rand(order.length)
        order = swap(order, index_a, index_b)
      end
    end
  end

  def calc_distance(sights, order)
    sum = 0

    order.each_with_index do |i, index|
      break if index == order.length - 1

      city_a = sights[i]
      city_b = sights[order[index + 1]]
      d = Geocoder::Calculations.distance_between(city_a, city_b)
      sum += d
    end
    return sum
  end

  def swap(order, index_a, index_b)
    save = order[index_a]
    order[index_a] = order[index_b]
    order[index_b] = save
    return order
  end

  # def next_order(order)
  #   # lexicographic algorith
  #   # https://www.nayuki.io/page/next-lexicographical-permutation-algorithm
  #   # Step 1: Find the largest x such that P[x]<P[x+1]
  #   largest_i = -1
  #   order.each_with_index do |i, index|
  #     break if index == order.length - 1

  #     largest_i = i if i < order[index + 1]
  #   end
  #   return "STOP" if largest_i == -1

  #   # Step 2: Find the largest y such that P[x]<P[y]
  #   largest_j = -1
  #   order.each do |j|
  #     largest_j = j if largest_i < j
  #   end

  #   # Step 3: Swap P[x] and P[y]
  #   order = swap(order, largest_i, largest_j)

  #   # Step 4: Reverse P[x+1 .. n]
  #   end_array = order.slice!(order.index(largest_j) + 1..order.length - 1)
  #   end_array.reverse!
  #   order = order.concat(end_array)
  # end
end

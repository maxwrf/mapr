class AddCityToPlans < ActiveRecord::Migration[5.2]
  def change
    add_column :plans, :city, :string
  end
end

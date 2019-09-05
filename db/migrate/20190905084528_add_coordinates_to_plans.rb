class AddCoordinatesToPlans < ActiveRecord::Migration[5.2]
  def change
    add_column :plans, :latitude, :float
    add_column :plans, :longitude, :float
  end
end

class AddStartdatetimeToPlans < ActiveRecord::Migration[5.2]
  def change
    add_column :plans, :start_date_time, :datetime
  end
end

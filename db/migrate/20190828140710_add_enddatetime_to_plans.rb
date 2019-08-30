class AddEnddatetimeToPlans < ActiveRecord::Migration[5.2]
  def change
    add_column :plans, :end_date_time, :datetime
  end
end

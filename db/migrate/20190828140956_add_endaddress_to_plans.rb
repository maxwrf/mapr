class AddEndaddressToPlans < ActiveRecord::Migration[5.2]
  def change
    add_column :plans, :end_address, :string
  end
end

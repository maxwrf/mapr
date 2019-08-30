class AddCategoriesToPlans < ActiveRecord::Migration[5.2]
  def change
    add_column :plans, :categories, :string
  end
end

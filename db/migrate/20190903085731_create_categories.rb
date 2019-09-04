class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :search_term
      t.integer :avg_visit_mins
      t.timestamps
    end
  end
end

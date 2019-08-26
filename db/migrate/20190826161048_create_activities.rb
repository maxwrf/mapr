class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.references :plan, foreign_key: true
      t.datetime :start_date_time
      t.datetime :end_date_time
      t.string :name
      t.string :address
      t.float :longitude
      t.float :latitude
      t.integer :price_per_adult
      t.integer :price_per_child
      t.float :average_rating
      t.string :category
      t.string :subcategory
      t.string :opening_hours

      t.timestamps
    end
  end
end

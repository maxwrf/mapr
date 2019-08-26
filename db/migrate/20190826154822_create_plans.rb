class CreatePlans < ActiveRecord::Migration[5.2]
  def change
    create_table :plans do |t|
      t.integer :number_adults
      t.integer :number_children
      t.boolean :permit_walk
      t.boolean :permit_car
      t.boolean :permit_cycle
      t.boolean :permit_public_transport
      t.string :search_priority
      t.string :name
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

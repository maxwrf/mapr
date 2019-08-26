class CreateDays < ActiveRecord::Migration[5.2]
  def change
    create_table :days do |t|
      t.references :plan, foreign_key: true
      t.datetime :start_date_time
      t.datetime :end_date_time
      t.string :start_address
      t.string :end_address

      t.timestamps
    end
  end
end

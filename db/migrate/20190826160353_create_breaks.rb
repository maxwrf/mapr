class CreateBreaks < ActiveRecord::Migration[5.2]
  def change
    create_table :breaks do |t|
      t.references :plan, foreign_key: true
      t.datetime :start_date_time
      t.datetime :end_date_time
      t.integer :preference_length
      t.datetime :preference_window_start
      t.datetime :preference_window_end

      t.timestamps
    end
  end
end

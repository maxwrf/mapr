class CreateTransports < ActiveRecord::Migration[5.2]
  def change
    create_table :transports do |t|
      t.references :plan, foreign_key: true
      t.datetime :start_date_time
      t.datetime :end_date_time
      t.string :mode
      t.string :details

      t.timestamps
    end
  end
end

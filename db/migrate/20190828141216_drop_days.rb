class DropDays < ActiveRecord::Migration[5.2]
  def change
    drop_table :days
  end
end

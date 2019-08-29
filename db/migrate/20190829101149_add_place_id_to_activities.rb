class AddPlaceIdToActivities < ActiveRecord::Migration[5.2]
  def change
    add_column :activities, :place_id, :string
  end
end

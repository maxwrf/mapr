class AddImageToActivity < ActiveRecord::Migration[5.2]
  def change
    add_column :activities, :image_ref, :string
  end
end

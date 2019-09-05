class Plan < ApplicationRecord
  has_many :activities, dependent: :destroy
  has_many :breaks, dependent: :destroy
  belongs_to :user
  validates :city, :start_date_time, presence: true
  accepts_nested_attributes_for :breaks
  geocoded_by :city
  after_validation :geocode, if: :will_save_change_to_city?
end

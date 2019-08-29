class Plan < ApplicationRecord
  has_many :activities
  has_many :breaks
  belongs_to :user
  validates :city, :start_date_time, presence: true
  accepts_nested_attributes_for :breaks
end

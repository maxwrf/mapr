class Plan < ApplicationRecord
  has_many :activities, dependent: :destroy
  has_many :breaks, dependent: :destroy
  belongs_to :user
  validates :city, :start_date_time, presence: true
  accepts_nested_attributes_for :breaks
end

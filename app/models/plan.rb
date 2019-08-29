class Plan < ApplicationRecord
  has_many :activities
  belongs_to :user
  validates :city, :start_date_time, presence: true
end

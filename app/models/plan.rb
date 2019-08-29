class Plan < ApplicationRecord
  belongs_to :user
  validates :city, :start_date_time, presence: true
end

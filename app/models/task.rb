class Task < ApplicationRecord
  belongs_to :user
  belongs_to :work_session
end

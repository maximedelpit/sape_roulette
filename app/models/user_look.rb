class UserLook < ActiveRecord::Base
  belongs_to :user
  belongs_to :look
end

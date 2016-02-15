class UserLook < ActiveRecord::Base
  belongs_to :user
  belongs_to :look
  acts_as_votable
end

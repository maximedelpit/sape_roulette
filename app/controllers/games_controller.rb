class GamesController < ApplicationController
  def index
    if current_user
      @graph = Koala::Facebook::API.new(current_user.token)
      @profile = @graph.get_object("me")
      @friends = @graph.get_connections("me", 'taggable_friends', { fields: ['id', 'type', 'picture.type(large)']})
      @pictures = @friends.map{|f| f["picture"]["data"]["url"]}
    end
  end
end

class GamesController < ApplicationController
  def index
    if current_user
      @graph = Koala::Facebook::API.new(current_user.token)
      @profile = @graph.get_object("me")
      @facebook_friends = @graph.get_connections("me", 'taggable_friends', { fields: ['id', 'name', 'type', 'picture.type(large)']})
      @friends = @facebook_friends.map do |f|
        {name: f["name"], url: f["picture"]["data"]["url"]}
      end
      @looks = Look.all
      @user_looks = current_user.user_looks
    end
  end

  def upvote
    params[:games][:action] == "match" ? like = true : like = false
    @user_look = UserLook.where(user: current_user, friend: params[:games][:friend], look_id: params[:games][:look_id]).first
    if @user_look
      @user_look.like = like
    else
      @user_look = UserLook.new(user: current_user, friend: params[:games][:friend], look_id: params[:games][:look_id], like: like)
    end
    @user_look.save
    respond_to do |format|
      format.json {}
    end
  end

  private

end

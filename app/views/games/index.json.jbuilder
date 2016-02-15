
# json.friends do
#   json.array! @facebook_friends do |friend|
#     json.id friend["id"]
#     json.name friend["name"]
#     json.url friend["picture"]["data"]["url"]
#   end
# end
# json.looks do
#   json.array! @looks do |look|
#     json.id look.id
#     json.name ""
#     json.url look.url
#   end
# end
# json.friend_looks do
#   json.array! @user_looks do |user_look|
#     json.id user_look.id
#     json.user_id user_look.user_id
#     json.look_id user_look.look_id
#     json.friend user_look.friend
#     json.like user_look.like
#   end
# end


json.friends do
  @facebook_friends.each do |friend|
    json.set! "#{friend['id']}" do
      json.name friend["name"]
      json.url friend["picture"]["data"]["url"]
    end
  end
end
json.looks do
  @looks.each do |look|
    json.set! look.id do
      json.url look.url
    end
  end
end
json.friend_looks do
  @user_looks.each do |user_look|
    json.set! user_look.id do
      json.user_id user_look.user_id
      json.look_id user_look.look_id
      json.friend user_look.friend
      json.like user_look.like
    end
  end
end

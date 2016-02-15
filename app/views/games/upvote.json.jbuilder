json.set! @user_look.id do
  json.user_id @user_look.user_id
  json.look_id @user_look.look_id
  json.friend @user_look.friend
  json.like @user_look.like
end


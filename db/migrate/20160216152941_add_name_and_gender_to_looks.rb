class AddNameAndGenderToLooks < ActiveRecord::Migration
   def change
    add_column :looks, :name, :string
    add_column :looks, :gender, :string
  end
end

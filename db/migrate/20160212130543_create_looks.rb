class CreateLooks < ActiveRecord::Migration
  def change
    create_table :looks do |t|
      t.string :url
      t.boolean :fun

      t.timestamps null: false
    end
  end
end

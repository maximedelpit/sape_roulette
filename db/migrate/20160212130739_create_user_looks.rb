class CreateUserLooks < ActiveRecord::Migration
  def change
    create_table :user_looks do |t|
      t.references :user, index: true, foreign_key: true
      t.references :look, index: true, foreign_key: true
      t.string :friend
      t.boolean :like

      t.timestamps null: false
    end
  end
end

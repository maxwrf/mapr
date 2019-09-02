# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_30_094632) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.bigint "plan_id"
    t.datetime "start_date_time"
    t.datetime "end_date_time"
    t.string "name"
    t.string "address"
    t.float "longitude"
    t.float "latitude"
    t.integer "price_per_adult"
    t.integer "price_per_child"
    t.float "average_rating"
    t.string "category"
    t.string "subcategory"
    t.string "opening_hours"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "place_id"
    t.index ["plan_id"], name: "index_activities_on_plan_id"
  end

  create_table "breaks", force: :cascade do |t|
    t.bigint "plan_id"
    t.datetime "start_date_time"
    t.datetime "end_date_time"
    t.integer "preference_length"
    t.datetime "preference_window_start"
    t.datetime "preference_window_end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_breaks_on_plan_id"
  end

  create_table "plans", force: :cascade do |t|
    t.integer "number_adults"
    t.integer "number_children"
    t.boolean "permit_walk"
    t.boolean "permit_car"
    t.boolean "permit_cycle"
    t.boolean "permit_public_transport"
    t.string "search_priority"
    t.string "name"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "start_date_time"
    t.datetime "end_date_time"
    t.string "start_address"
    t.string "end_address"
    t.string "city"
    t.string "categories"
    t.index ["user_id"], name: "index_plans_on_user_id"
  end

  create_table "taggings", id: :serial, force: :cascade do |t|
    t.integer "tag_id"
    t.string "taggable_type"
    t.integer "taggable_id"
    t.string "tagger_type"
    t.integer "tagger_id"
    t.string "context", limit: 128
    t.datetime "created_at"
    t.index ["context"], name: "index_taggings_on_context"
    t.index ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context"
    t.index ["taggable_id", "taggable_type", "tagger_id", "context"], name: "taggings_idy"
    t.index ["taggable_id"], name: "index_taggings_on_taggable_id"
    t.index ["taggable_type"], name: "index_taggings_on_taggable_type"
    t.index ["tagger_id", "tagger_type"], name: "index_taggings_on_tagger_id_and_tagger_type"
    t.index ["tagger_id"], name: "index_taggings_on_tagger_id"
  end

  create_table "tags", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "taggings_count", default: 0
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "transports", force: :cascade do |t|
    t.bigint "plan_id"
    t.datetime "start_date_time"
    t.datetime "end_date_time"
    t.string "mode"
    t.string "details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["plan_id"], name: "index_transports_on_plan_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "activities", "plans"
  add_foreign_key "breaks", "plans"
  add_foreign_key "plans", "users"
  add_foreign_key "transports", "plans"
end

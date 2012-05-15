class Location
  include MongoMapper::Document
  include MongoMapperExt::Filter
  include MongoMapperExt::Slugizer

  key :_id, String
  key :_type, String
  key :name, String, :default => "Loc"

  key :loc_address_i, String, :default => "Line 1"
  key :loc_address_ii, String, :default => "Line 2"
  key :loc_city, String, :default => "Melbourne"
  key :loc_state, String, :default => "VIC"
  key :loc_region, String, :default => "Australia"
  key :loc_postcode, String, :default => "3000"
  key :loc_phone, String, :default => "0425425550"
  key :loc_fax, String

  key :opening_hours1, String, :default => "Weekdays 9-6"
  key :opening_hours2, String, :default => "Sun 11-4"

  key :latitude, String, :default => "-37.816608"
  key :longitude, String, :default => "144.890106"

  key :show_alt_button, Boolean, :default => false
  key :alt_button_text, :default => "Order Online"
  key :alt_button_link, :default => "link"

  slug_key :name, :unique => true, :min_length => 3
  key :slugs, Array, :index => true



  timestamps!

  key :group_id, String
  belongs_to :group

  validates_presence_of :group_id

end


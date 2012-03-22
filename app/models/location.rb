class Location
  include MongoMapper::Document
  include MongoMapperExt::Filter

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

  key :latitude, String, :default => "-37.816608"
  key :longitude, String, :default => "144.890106"


  timestamps!

  key :group_id, String
  belongs_to :group

  validates_presence_of :group_id

end


class Listing
  include MongoMapper::Document
  include MongoMapperExt::Filter

  key :_id, String
  key :_type, String
  key :name, String
  key :description, String, :default => "Description"

  key :list_members, String, :default => "abc,def,ghi"

  timestamps!

  key :group, String
  belongs_to :group

  validates_presence_of :group


  def up
    self.move_to("up")
  end

  def down
    self.move_to("down")
  end

  def move_to(pos)
    pos ||= "up"
    listings = group.listings
    current_pos = listings.index(self)
    if pos == "up"
      pos = current_pos-1
    elsif pos == "down"
      pos = current_pos+1
    end

    if pos >= listings.size
      pos = 0
    elsif pos < 0
      pos = listing.size-1
    end

    listings[current_pos], listings[pos] = listings[pos], listings[current_pos]
    group.listings = listings
    group.save
  end







end


class Category
  include MongoMapper::Document
  include MongoMapperExt::Filter

  key :_id, String
  key :_type, String
  key :name, String

  timestamps!



  belongs_to :group



end


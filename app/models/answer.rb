class Answer < Comment
  include MongoMapper::Document
  include MongoMapperExt::Filter
  include Support::Versionable
  key :_id, String

  key :mode, String

  key :body, String, :required => true
  key :language, String, :default => "en"
  key :flags_count, Integer, :default => 0
  key :banned, Boolean, :default => false
  key :wiki, Boolean, :default => false
  key :anonymous, Boolean, :default => false, :index => true

  timestamps!

  key :updated_by_id, String
  belongs_to :updated_by, :class_name => "User"

  key :item_id, String
  belongs_to :item

  has_many :flags

  has_many :comments, :foreign_key => "commentable_id", :class_name => "Comment", :order => "created_at asc", :dependent => :destroy

  validates_presence_of :user_id

  versionable_keys :body
  filterable_keys :body

  validate :disallow_spam
  validate :check_unique_answer, :if => lambda { |a| (!a.group.forum && !a.disable_limits?) }

  before_destroy :unsolve_item

  def check_unique_answer
    check_answer = Answer.first(:item_id => self.item_id,
                               :user_id => self.user_id)

    if !check_answer.nil? && check_answer.id != self.id
      self.errors.add(:limitation, "Your can only post one answer by item.")
      return false
    end
  end

  def on_add_vote(v, voter)
    if v > 0
      self.user.update_reputation(:answer_receives_up_vote, self.group)
      voter.on_activity(:vote_up_answer, self.group)
    else
      self.user.update_reputation(:answer_receives_down_vote, self.group)
      voter.on_activity(:vote_down_answer, self.group)
    end
  end

  def on_remove_vote(v, voter)
    if v > 0
      self.user.update_reputation(:answer_undo_up_vote, self.group)
      voter.on_activity(:undo_vote_up_answer, self.group)
    else
      self.user.update_reputation(:answer_undo_down_vote, self.group)
      voter.on_activity(:undo_vote_down_answer, self.group)
    end
  end

  def flagged!
    self.increment(:flags_count => 1)
  end


  def ban
    self.item.answer_removed!
    unsolve_item
    self.set({:banned => true})
  end

  def self.ban(ids)
    self.find_each(:_id.in => ids, :select => [:item_id]) do |answer|
      answer.ban
    end
  end

  def to_html
    Maruku.new(self.body).to_html
  end

  def disable_limits?
    self.user.present? && self.user.can_post_whithout_limits_on?(self.group)
  end

  def disallow_spam
    if new? && !disable_limits?
      eq_answer = Answer.first({:body => self.body,
                                  :item_id => self.item_id,
                                  :group_id => self.group_id
                                })

      last_answer  = Answer.first(:user_id => self.user_id,
                                   :item_id => self.item_id,
                                   :group_id => self.group_id,
                                   :order => "created_at desc")

      valid = (eq_answer.nil? || eq_answer.id == self.id) &&
              ((last_answer.nil?) || (Time.now - last_answer.created_at) > 20)
      if !valid
        self.errors.add(:body, "Your answer looks like spam.")
      end
    end
  end

  protected
  def unsolve_item
    if !self.item.nil? && self.item.answer_id == self.id
      self.item.set({:answer_id => nil, :accepted => false})
    end
  end
end

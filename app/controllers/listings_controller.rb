class ListingsController < ApplicationController

  # GET /listings
  # GET /listings.xml
  def index
    @group = current_group
    @listings = current_group.listings



    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @listings }
    end
  end

  # GET /listings/1
  # GET /listings/1.xml
  def show

    @listing = Listing.find(params[:id])
    #@list_members = @listing.list_members.split(',')



    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @listing }
    end
  end

  # GET /listings/new
  # GET /listings/new.xml
  def new

    @listing = Listing.new
    @listing.group = current_group

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @listing }
    end
  end

  # GET /listings/1/edit
  def edit
    @listing = Listing.find(params[:id])
  end

  # POST /listings
  # POST /listings.xml
  def create
    @listing = Listing.new
    @listing.safe_update(%w[name], params[:listing])

    @listing.group = current_group

    respond_to do |format|
      if @listing.save
        format.html { redirect_to(listings_path, :notice => 'Listing was successfully created so it claims.') }
        format.xml  { render :xml => @listing, :status => :created, :location => @listing }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @listing.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /listings/1
  # PUT /listings/1.xml

  def update

    @listing = Listing.find(params[:id])
    @listing.safe_update(%w[name list_members], params[:listing])

    respond_to do |format|
      if @listing.save
        format.html { redirect_to(listings_path, :notice => 'Listing was successfully updated so it claims.') }
        format.xml  { render :xml => @listing, :status => :created, :location => @listing }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @listing.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /listings/1
  # DELETE /listings/1.xml

  def destroy
    @item = Item.find_by_slug_or_id(params[:item_id])
    @listing = Listing.find(params[:id])
    @listing.destroy

    respond_to do |format|
      format.html { redirect_to(item_listings_path(@item.doctype_id, @item), :notice => 'Listing was successfully deleted so it claims.') }
      format.xml  { head :ok }
    end
  end

  def move
    @group = current_group
    @listings = current_group.listings
    listing = @listings.find_by_slug_or_id(params[:id])
    #doctype = Doctype.find_by_slug_or_id(params[:id])

    listing.move_to(params[:move_to])

    redirect_to listings_path
  end




end

#Break out the listings





class LocationsController < ApplicationController

  # GET /locations
  # GET /locations.xml
  def index
    
    @group = current_group

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @locations }
    end
  end

  # GET /locations/1
  # GET /locations/1.xml
  def show
 
    @location = Location.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @Location }
    end
  end

  # GET /locations/new
  # GET /locations/new.xml
  def new
    @group = current_group
    @location = Location.new

    @location.name = current_group.display_name
    @location.loc_city = current_group.group_city



    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @Location }
    end
  end

  # GET /locations/1/edit
  def edit
    @Location = Location.find(params[:id])
  end

  # POST /locations
  # POST /locations.xml
  def create
    @group = current_group
    @location = Location.new
    @location.safe_update(%w[name loc_city], params[:location])


    @location.group = @group

    respond_to do |format|
      if @location.save
        format.html { redirect_to(locations_path, :notice => 'Location was successfully created so it claims.') }
        format.xml  { render :xml => @location, :status => :created, :location => @location }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @location.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /locations/1
  # PUT /locations/1.xml

  def update
    @item = Item.find_by_slug_or_id(params[:item_id])
    @Location = Location.find(params[:id])
    @Location.safe_update(%w[name], params[:Location])

    respond_to do |format|
      if @Location.save
        format.html { redirect_to(item_locations_path(@item.doctype_id, @item), :notice => 'Location was successfully updated so it claims.') }
        format.xml  { render :xml => @Location, :status => :created, :location => @Location }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @Location.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /locations/1
  # DELETE /locations/1.xml

  def destroy
    
    @location = Location.find(params[:id])
    @location.destroy

    respond_to do |format|
      format.html { redirect_to(locations_path, :notice => 'Location was successfully deleted so it claims.') }
      format.xml  { head :ok }
    end
  end
end

#Break out the locations

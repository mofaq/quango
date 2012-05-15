class LocationsController < ApplicationController

  before_filter :login_required, :except => [:pages, :index, :show, :logo,:sponsor_logo_wide,:sponsor_logo_narrow,:modetect,:group_style,:group_style_mobile, :css, :signup_button_css, :favicon, :background]
  #before_filter :check_permissions, :only => [:edit, :update, :close]

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
 
    @location = Location.find_by_slug_or_id(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @location }
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
    @location = Location.find_by_slug_or_id(params[:id])
    @address = [@location.loc_address_i, @location.loc_city].join(',')

    @geo_location = GoogleMapsGeocoder.new(@address)

    puts @address
    puts @geo_location

    @location.longitude = @geo_location.lng
    @location.latitude = @geo_location.lat
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

    @location = Location.find_by_slug_or_id(params[:id])
    @location.safe_update(%w[name show_alt_button alt_button_text alt_button_link loc_address_i loc_address_ii loc_city loc_phone loc_postcode loc_state loc_region longitude latitude opening_hours1 opening_hours2], params[:location])

    @address = [@location.loc_address_i,@location.loc_city].join(',')
    #@geo_location = GoogleMapsGeocoder.new(@address)

    #@location.longitude = @geo_location.lng
    #@location.latitude = @geo_location.lat

    puts @address
    #puts @geo_location

    respond_to do |format|
      if @location.save
        format.html { redirect_to(edit_location_path(@location), :notice => 'Location was successfully updated so it claims.') }
        format.xml  { render :xml => @location, :status => :created, :location => @location }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @location.errors, :status => :unprocessable_entity }
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

  protected

  #Break out the locations

  def google_maps
    @location = Location.find(params[:id])
    address = [@location.loc_address_i, @location.loc_city, @location.loc_state, @location.loc_region].join(', ')
    address = CGI::escape(address)
    uri = "http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false"
    response = http_request(uri,"GET")
    if(response['status'] == "OK")
      geo = response['results'][0]['geometry']['location']
      @location.latitude = geo['lat']
      @location.longitude = geo['lng']

      api_key = "AIzaSyAlzkt8p7MDY0igloVFWD1-kQ2wYynxLgs"
      location = @location.latitude.to_s+","+@location.longitude.to_s
      name = CGI::escape(@location.name)
      uri = "https://maps.googleapis.com/maps/api/place/search/json?location="+location+"&radius=50&name="+name+"&sensor=false&key="+api_key
      response = http_request(uri,"GET",true)

      if response['status'] == "ZERO_RESULTS"
        place = {
          'location' => {
            'lat' => @location.latitude,
            'lng' => @location.longitude
          },
          'accuracy' => 50,
          'name' => @location.name,
          'types' => ["establishment"],
          'language' => "en-AU"
        }.to_json
        uri =  "https://maps.googleapis.com/maps/api/place/add/json?sensor=false&key="+api_key
        response = http_request(uri,"POST",true,place)
        @group.group_place_reference = response['reference'] if response['status'] == "OK"
      end
      

    end

  end

  def http_request(uri, type, use_ssl = false, payload = nil)
    uri = URI(uri)
    http = Net::HTTP.new(uri.host,uri.port)

    if use_ssl
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    end

    if type == "GET"
      request = Net::HTTP::Get.new(uri.request_uri)
    elsif type == "POST" && payload != nil
      request = Net::HTTP::Post.new(uri.request_uri)
      request.body = payload
      request.content_type = "application/json"
    end

    response = http.request(request)
    return JSON.parse(response.body)
    
  end  

  def check_permissions
    @group = Group.find_by_slug_or_id(params[:id])

    if @group.nil?
      redirect_to groups_path
    elsif !current_user.owner_of?(@group)
      flash[:error] = t("global.permission_denied")
      redirect_to group_path(@group)
    end
  end

end


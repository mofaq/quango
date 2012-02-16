class CategoriesController < ApplicationController

  # GET /bunnies
  # GET /bunnies.xml
  def index
@group = current_group

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @categories }
    end
  end

  # GET /bunnies/1
  # GET /bunnies/1.xml
  def show
@group = current_group
    @category = category.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @category }
    end
  end

  # GET /bunnies/new
  # GET /bunnies/new.xml
  def new
@group = current_group
    @category = category.new
    @category.group = @group

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @category }
    end
  end

  # GET /bunnies/1/edit
  def edit
    @category = category.find(params[:id])
  end

  # POST /bunnies
  # POST /bunnies.xml
  def create
    @category = category.new
    @category.safe_update(%w[name], params[:category])
@group = current_group
    @category.group = @group

    respond_to do |format|
      if @category.save
        format.html { redirect_to(categories_path(@group), :notice => 'category was successfully created so it claims.') }
        format.xml  { render :xml => @category, :status => :created, :location => @category }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @category.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /bunnies/1
  # PUT /bunnies/1.xml

  def update
@group = current_group
    @category = category.find(params[:id])
    @category.safe_update(%w[name], params[:category])

    respond_to do |format|
      if @category.save
        format.html { redirect_to(categories_path(@group), :notice => 'category was successfully updated so it claims.') }
        format.xml  { render :xml => @category, :status => :created, :location => @category }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @category.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /bunnies/1
  # DELETE /bunnies/1.xml

  def destroy
@group = current_group
    @category = category.find(params[:id])
    @category.destroy

    respond_to do |format|
      format.html { redirect_to(categories_path(@group), :notice => 'category was successfully deleted so it claims.') }
      format.xml  { head :ok }
    end
  end
end

#Break out the bunnies

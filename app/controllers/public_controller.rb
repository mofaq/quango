class PublicController < ApplicationController

  layout "escaped"

  def modetect

    @mofaqId = params[:mofaqId]

    @group = Group.find(@mofaqId)


    respond_to do |format|
      format.html
      format.css
      format.js
    end

  end

end

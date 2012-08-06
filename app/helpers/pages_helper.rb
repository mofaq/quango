module PagesHelper
  require 'nokogiri'
  require 'open-uri'
  def safe_page?(page)
    !page.wiki && page.user.role_on(current_group) == "owner"
  end

  def scrape(page)
    return Nokogiri::HTML(open(page.scrape_url)).at_css(page.scrape_id.to_s).to_html
  end
end

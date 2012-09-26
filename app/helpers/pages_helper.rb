module PagesHelper
  require 'nokogiri'
  require 'open-uri'
  def safe_page?(page)
    !page.wiki && page.user.role_on(current_group) == "owner"
  end

  def scrape(page)
    scrapings = Nokogiri::HTML(open(page.scrape_url)).at_css(page.scrape_id.to_s).to_html

    if page.scrape_domain?
      scrappy_scrapings = Nokogiri::HTML.parse(scrapings)
      scrappy_scrapings.css('a').each do |link|
    
      href_link = link['href']
      link.set_attribute('href', page.scrape_domain + href_link)
      end

      scrappy_scrapings.css('img').each do |src|
    
      src_link = src['src']
      src.set_attribute('src', page.scrape_domain + src_link)
      end


      
      scrapings = scrappy_scrapings

    end

    return scrapings
  end



end

desc "Retrieve looks"
task :retrieve_looks => :environment do

  require 'open-uri'
  require 'nokogiri'

  url_women = "http://www.asos.fr/decouvrez/as-seen-on-me?Gender=womens"
  url_men = "http://www.asos.fr/decouvrez/as-seen-on-me?Gender=mens"

  # Women
  puts 'starting women'
  html_file = open(url_women)
  html_doc = Nokogiri::HTML(html_file)

  puts html_doc.search('.acd-gallery-item')
  html_doc.search('.acd-gallery-item').each do |element|
    url = element.search('.acd-style-img').attribute('src')
    name = element.search('.acd-item-copy h2').text
    puts 'element'
    puts element
    puts 'url women =====>'
    puts url
    puts 'name women =====>'
    puts name
    look = Look.where(name: name, gender: 'F').first_or_create(url: url, fun: false)
  end

  # # Men
  # puts 'starting men'
  # html_file = open(url_women)
  # html_doc = Nokogiri::HTML(html_file)
  # puts html_doc.search('.acd-gallery-item').size
  # html_doc.search('.acd-gallery-item').each do |element|
  #   url = element.search('.acd-style-img').attribute('src')
  #   name = element.search('.acd-item-copy h2').text
  #   puts 'url men =====>'
  #   puts url
  #   puts 'name men =====>'
  #   puts name
  #   look = Look.where(name: name, gender: 'M').first_or_create(url: url, fun: false)
  # end
end

from ProductModels.ProductBuilder import ProductBuilder
from ProductModels.Product import Product
from Tools import json_tools, url_tools

# Globals
product_list = []
products_soup = []

main_url = "https://www.ikea.com"
# URLs for various pages as strings
couch_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/39130/"
sleeper_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/10663/"
all_urls = []
all_urls.append(couch_url)
all_urls.append(sleeper_url)

# turn all of the URLs into soup and elements of those pages into soup
for a_url in all_urls:
    all_url_soup = url_tools.get_soup_from_url(a_url)
    products_soup += all_url_soup.findAll("div", class_="threeColumn product ")
    products_soup += all_url_soup.findAll("div",
                                          class_="threeColumn product lastColumn")


# JUST WORKING ON ONE PRODUCT NOW

# get the data from the json and read it into a python JSON object
# get URL first product
couch_url = "https://www.ikea.com" + \
    products_soup[1].findAll("a", class_="productLink")[0]['href']


# load that string into a JSON and soup
couch_product_data_json, couch_soup = json_tools.get_product_data_from_url(
    couch_url)
smaller_chunk = couch_product_data_json['product']['items'][0]
review = couch_soup.findAll("a", class_="ratingsCount")[0].text
# build product
current_product = ProductBuilder() \
    .with_name(smaller_chunk['name']) \
    .with_category(couch_soup.findAll(
        "meta", attrs={'name': 'IRWStats.categoryLocal'})[0]['content']) \
    .with_description(smaller_chunk['type']) \
    .with_price(smaller_chunk['prices']['normal']['priceNormal']['priceExclVat']) \
    .with_details([item['validDesign'][0] for item in couch_product_data_json['product']['items']]) \
    .with_article_id(couch_product_data_json['product']['partNumber']) \
    .with_review(review if not review == "Review" else "N/A") \
    .with_image_url(main_url + couch_soup.findAll("img", id="productImg")[0]['src']) \
    .build()

print(current_product)
# print(help(url_tools.get_cache_file_name))

from ProductModels.ProductBuilder import ProductBuilder
from ProductModels.Product import Product
from Tools import url_tools
import re
import json

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

# Soupify from URL
all_couches_soup = url_tools.get_soup_from_url(couch_url)

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
# turn that URL into soup
couch_soup = url_tools.get_soup_from_url(couch_url)
# get all of the scripts from said soup
scripts = couch_soup.findAll(
    "script", language="JavaScript", type="text/javascript")
# find the script that contains the product data
found_script = ""
for script in scripts:
    if str(script).find("jProductData") != -1:
        found_script = script.text
# extract the product data JSON as a string and format it into something that python likes
product_data_json = re.findall(
    r'[^\t]*var jProductData[^\t]*;', found_script)[0]
# cut the beginning off
start_index = 0
for i in range(len(product_data_json)):
    if product_data_json[i] == "{":
        start_index = i
        break

end_index = len(product_data_json)
for i in reversed(range(len(product_data_json))):
    if product_data_json[i] == "}":
        end_index = i
        break

# turn into json string
final_json_string = product_data_json[start_index:end_index + 1]

# load that string into a JSON
product_data_json = json.loads(final_json_string)

# get all of the parts that are needed to complete the product
smaller_chunk = product_data_json['product']['items'][0]

description = smaller_chunk['type']
name = smaller_chunk['name']
price = smaller_chunk['prices']['normal']['priceNormal']['priceExclVat']
# NOTE: want to check eventually for duplicates so we don't fuck up the database
article_id = product_data_json['product']['partNumber']
# number of descriptions will be the combinations of the options
options = []
for item in product_data_json['product']['items']:
    options.append(item['validDesign'][0])
#N/A if no review
review = couch_soup.findAll("a", class_="ratingsCount")[0].text
review =  review if not review == "Review" else "N/A"

image_url = main_url + couch_soup.findAll("img", id = "productImg")[0]['src']
category = couch_soup.findAll("meta", attrs={'name': 'IRWStats.categoryLocal'})[0]['content']

current_product = ProductBuilder.product() \
        .with_name(name) \
        .with_category(category) \
        .with_description(description) \
        .with_price(price) \
        .with_details(options[0]) \
        .with_article_id(article_id) \
        .with_review(review) \
        .with_image_url(image_url) \
        .build()

print(current_product)

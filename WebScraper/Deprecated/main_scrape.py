from ProductModels.ProductBuilder import ProductBuilder
from ProductModels.Product import Product
import os
from Tools import url_tools
import re
import json

from slimit import ast
from slimit.parser import Parser as JavascriptParser
from slimit.visitors import nodevisitor

# URLs for various pages as strings
couch_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/39130/"
sleeper_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/10663/"
all_urls = []
all_urls.append(couch_url)
all_urls.append(sleeper_url)

# Soupify from URL
all_couches_soup = url_tools.get_soup_from_url(couch_url)
# sample_couch_soup = url_tools.get_soup_from_url(samplecouch)

product_list = []
products_soup = []

for a_url in all_urls:
    all_couches_soup = url_tools.get_soup_from_url(a_url)
    products_soup += all_couches_soup.findAll("div", class_="threeColumn product ")
    products_soup += all_couches_soup.findAll("div",
                                              class_="threeColumn product lastColumn")

# products_soup = all_couches_soup.findAll("div", class_="threeColumn product ")
# products_soup += all_couches_soup.findAll("div",
#                                           class_="threeColumn product lastColumn")


#trying to get JSON data out of the first product
# couch_url = "https://www.ikea.com" + \
#     products_soup[1].findAll("a", class_="productLink")[0]['href']
# couch_soup = url_tools.get_soup_from_url(couch_url)
# # print(couch_soup.prettify())
# scripts = couch_soup.findAll("script", language="JavaScript", type = "text/javascript")
# found_script = ""
# for script in scripts:
#     if str(script).find("jProductData") != -1:
#         found_script = script.text
#
# # print(found_script)
# json_text = re.findall(r'[^\t]*var jProductData[^\t]*;', found_script)[0]
# # json_text = re.findall(r'jProductData', found_script)
# print(json_text)
from pprint import pprint

with open('data.json') as f:
    data = json.load(f)

print(data['product']['items'][0]['type'])


# TESTS DUPLICATES
# for i in range(len(products_soup)):
#     p = products_soup[i]
#     couch_url = "https://www.ikea.com" + \
#         p.findAll("a", class_="productLink")[0]['href']
#     couch_soup = url_tools.get_soup_from_url(couch_url)
#
#     details_full_string = couch_soup.findAll(
#         "span", id="type", class_="productType")[0].text
#     review = couch_soup.findAll("a", class_="ratingsCount")[0].text
#     print(couch_soup.findAll("meta", attrs={'name': 'product_name'})[0]['content'] + \
#         re.findall(r'(^\s*.*),(\s+.*)', details_full_string)[0][1])
#     current_product = ProductBuilder.product() \
#         .with_name(couch_soup.findAll("meta", attrs={'name': 'product_name'})[0]['content']) \
#         .with_category(couch_soup.findAll("meta", attrs={'name': 'IRWStats.categoryLocal'})[0]['content']) \
#         .with_description(p.findAll("span", class_="productDesp")[0].text) \
#         .with_price(couch_soup.findAll("meta", attrs={'name': 'price'})[0]['content']) \
#         .with_details(re.findall(r'(^\s*.*),(\s+.*)', details_full_string)[0][1]) \
#         .with_article_id(couch_soup.findAll("div", id="itemNumber", class_="floatLeft")[0].text) \
#         .with_review(review if not review == "Review" else "N/A") \
#         .build()
#
#     if current_product not in product_list:
#         product_list.append(current_product)

# print(product_list)

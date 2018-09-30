from ProductModels.ProductBuilder import ProductBuilder
import os
from Tools import url_tools
import re

#URLs for various pages as strings
couch_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/39130/"

#armchair URL below
# couch_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/16239/"

# samplecouch = "https://www.ikea.com/us/en/catalog/products/S19150508/"

#Create the html_cache directory if it doesn't already exists
if not os.path.exists("html_cache"):
    os.makedirs("html_cache")

#Soupify from URL
all_couches_soup = url_tools.get_soup_from_url(couch_url)
# sample_couch_soup = url_tools.get_soup_from_url(samplecouch)

product_list = []

products_soup = all_couches_soup.findAll("div", class_="threeColumn product ")
products_soup += all_couches_soup.findAll("div", class_="threeColumn product lastColumn")

for i in range(len(products_soup)):
    p = products_soup[i]
    couch_url = "https://www.ikea.com" + p.findAll("a", class_="productLink")[0]['href']
    couch_soup = url_tools.get_soup_from_url(couch_url)

    details_full_string = couch_soup.findAll("span", id = "type", class_ = "productType")[0].text
    review = couch_soup.findAll("a", class_="ratingsCount")[0].text
    current_product = ProductBuilder.product() \
                                        .with_name(couch_soup.findAll("meta", attrs={'name':'product_name'})[0]['content']) \
                                        .with_category(couch_soup.findAll("meta", attrs={'name':'IRWStats.categoryLocal'})[0]['content']) \
                                        .with_description(p.findAll("span", class_="productDesp")[0].text) \
                                        .with_price(couch_soup.findAll("meta", attrs={'name':'price'})[0]['content']) \
                                        .with_details(re.findall(r'(^\s*.*),(\s+.*)', details_full_string)[0][1]) \
                                        .with_article_id(couch_soup.findAll("div", id = "itemNumber", class_="floatLeft")[0].text) \
                                        .with_review(review if not review == "Review" else "N/A") \
                                        .build()
        product_list.append(current_product)

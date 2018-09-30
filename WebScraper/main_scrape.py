import os
import url_tools
import re

#URLs for various pages as strings
couch_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/39130/"
samplecouch = "https://www.ikea.com/us/en/catalog/products/S19150508/"

#Create the html_cache directory if it doesn't already exists
if not os.path.exists("html_cache"):
    os.makedirs("html_cache")

#Soupify from URL
all_couches_soup = url_tools.get_soup_from_url(couch_url)
sample_couch_soup = url_tools.get_soup_from_url(samplecouch)

#prints the basic details of the couches to the console
products = all_couches_soup.findAll("div", class_="threeColumn product ")
# for p in products:
#     title = p.find("span", class_="productTitle").text
#     short_description = p.find("span", class_="productDesp").text
#     print(title,": ", short_description, "Colors: ", sep = "")

p = products[0]
# print(p.prettify())
couch_url = "https://www.ikea.com" + p.findAll("a", class_="productLink")[0]['href']
# print(couch_url)
couch_soup = url_tools.get_soup_from_url(couch_url)
# print(couch_soup.prettify())
name = p.findAll("span", class_ = "productTitle")[0].text
details = p.findAll("h1")
print(couch_soup.prettify())

#for each product on this page:
#Go to the URL of the product and pull the information below, then write to a
#product object
# for p in products:
#     couch_url = all_couches_soup.findAll("")
#     current_couch_soup = url_tools.get_soup_from_url(couch_url)

#IN COUCHES:
#Name
#Details
#Price
#Description
#Image URL
#Review
#Article ID
#Category

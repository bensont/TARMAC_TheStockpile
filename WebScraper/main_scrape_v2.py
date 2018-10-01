# from ProductModels.ProductBuilder import ProductBuilder
from Product import Product
from Tools import url_tools


# Globals
product_object_list = []
products_soup_list = []

main_url = "https://www.ikea.com"
# URLs for various pages as strings
couch_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/39130/"
sleeper_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/10663/"
all_urls = []
all_urls.append(couch_url)
all_urls.append(sleeper_url)

# turn all of the URLs into soup and elements of those pages into soup
for a_url in all_urls:
    a_url_soup = url_tools.get_soup_from_url(a_url)
    products_soup_list += a_url_soup.findAll("div", class_="threeColumn product ")
    products_soup_list += a_url_soup.findAll("div",
                                          class_="threeColumn product lastColumn")


# get the data from the json and read it into a python JSON object
# get URL first product
couch_url = "https://www.ikea.com" + \
    products_soup_list[1].findAll("a", class_="productLink")[0]['href']
current_product = Product(couch_url)

print(current_product)

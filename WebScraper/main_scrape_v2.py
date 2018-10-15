# from ProductModels.ProductBuilder import ProductBuilder
# from Product import Product
from Tools import url_tools
import traceback



def remove_dupes(product_list):
    no_dupes = []
    for p in product_list:
        if p not in no_dupes:
            no_dupes.append(p)
    return no_dupes


# Globals
product_object_list = []
full_individual_product_soups = []

main_url = "https://www.ikea.com"
# URLs for various pages as strings
couch_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/39130/"
sleeper_url = "https://www.ikea.com/us/en/catalog/categories/departments/living_room/10663/"
all_urls = []
all_urls.append(couch_url)
all_urls.append(sleeper_url)

# turn all of the URLs into soup and elements of those pages into soup
for a_url in all_urls:
    full_individual_product_soups += url_tools.build_url_soup_list(a_url)

full_individual_product_soups = remove_dupes(full_individual_product_soups)

print(len(full_individual_product_soups))

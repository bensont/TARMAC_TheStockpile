# from ProductModels.ProductBuilder import ProductBuilder
from Product import Product
from Tools import url_tools
import traceback

def build_url_soup_list(category_url):
    """
    Summary:
        Make a list of soup of individual products pages from a category URL

    Args:
        category_url (str):
            URL for a category of products, one level up from the individual products

    Returns:
        List<Soup>:
            List containing the soup of all the individual products in a sub category

    Usages:
        Input -> url for the 'sofas' page containing all products categorized as a 'sofa'
        Output -> list of individual product soups from all the sofas in URL
    """

    #get soup from category page
    category_soup = url_tools.get_soup_from_url(category_url)

    #get soup ELEMENTS from that category
    three_col = category_soup.findAll("div", class_="threeColumn product ")
    last_col = category_soup.findAll(
        "div", class_="threeColumn product lastColumn")
    #turn those soup ELEMENTS into FULL soup from the url of each individual product
    category_element_products_soups = three_col + last_col
    product_list = []
    for element in category_element_products_soups:
        individual_product_url = element.findAll("a", class_="productLink")[0]['href']
        product_list.append(Product(url_string = "https://www.ikea.com" + individual_product_url))
    return product_list

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
    full_individual_product_soups += build_url_soup_list(a_url)

full_individual_product_soups = remove_dupes(full_individual_product_soups)

print(len(full_individual_product_soups))

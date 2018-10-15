from Tools import url_tools
# import traceback
import sys

def remove_dupes(product_list):
    no_dupes = []
    for p in product_list:
        if p not in no_dupes:
            no_dupes.append(p)
    return no_dupes

# Globals
product_object_list = []
full_individual_product_soups = []
all_urls = url_tools.build_url_list_from_txt_file(sys.argv[1])
# turn all of the URLs into soup and elements of those pages into soup
for a_url in all_urls:
    full_individual_product_soups += url_tools.build_url_soup_list(a_url, 10)
#remove duplicates and print the len of the product list
full_individual_product_soups = remove_dupes(full_individual_product_soups)
print(len(full_individual_product_soups))

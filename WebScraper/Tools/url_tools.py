from urllib.request import urlopen as ureq
from bs4 import BeautifulSoup as soup
from .Product import Product
import os.path
import re

cache_directory = "html_cache\\"

def build_url_soup_list(category_url, num_products):
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
    category_soup = get_soup_from_url(category_url)

    #get soup ELEMENTS from that category
    three_col = category_soup.findAll("div", class_="threeColumn product ")
    last_col = category_soup.findAll(
        "div", class_="threeColumn product lastColumn")
    #turn those soup ELEMENTS into FULL soup from the url of each individual product
    category_element_products_soups = three_col + last_col
    product_list = []
    for i in range(num_products):
        if(i >= len(category_element_products_soups)):
            break
        element = category_element_products_soups[i]
        individual_product_url = element.findAll("a", class_="productLink")[0]['href']
        product_list.append(Product(url_string = "https://www.ikea.com" + individual_product_url))
    return product_list

def build_url_list_from_txt_file(filename):
    """

    Summary:
        Make a string list of URLs read from a file

    Args:
        filename (str):
            .txt file that has a list of URLs separated by new lines

    Returns:
        List<String>:
            List of individual URL strings

        Remarks:
            ignores lines starting with #, treating them as comments

    """
    url_list = []
    with open(filename, "r", encoding="utf-8") as f:
        url_list = f.read().splitlines()
    return [x for x in url_list if not x.startswith('#')]



def get_soup_from_url(url_string):
    """

    Summary:
        makes BS4 Soup from url string

    Args:
        url_string (str)

    Returns:
        Soup: Returns the soup made from the URL

    """
    # Create the html_cache directory if it doesn't already exist
    if not os.path.exists(cache_directory):
        os.makedirs(cache_directory)
    # if the html file doesn't already exist in the cache, open a connection
    # and cache the file
    cache_file_name = get_cache_file_name(url_string)
    if not os.path.exists(cache_file_name):
        # open and read from connection to URL
        uClient = ureq(url_string)
        thesoup = soup(uClient.read(), "html.parser")
        # write to cache file
        with open(cache_file_name, "w", encoding="utf-8") as f:
            f.write(str(thesoup))
        # close connection
        uClient.close()
    # else if the file does exist in the cache, make a soup out of it
    else:
        with open(cache_file_name, "r", encoding="utf-8") as f:
            thesoup = soup(f, "html.parser")
    return thesoup

# return a string that becomes the file name in the cache


def get_cache_file_name(url_string):
    """

    Summary:
        makes a filename for cache from url_string

    Args:
        url_string (str)

    Returns:
        str: filename for caching

    """
    return cache_directory + re.findall(r'\/[^\/]+\/[^\/]+\/$', url_string)[0].replace("/", "") + ".html"

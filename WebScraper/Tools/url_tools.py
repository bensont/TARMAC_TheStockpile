from urllib.request import urlopen as ureq
from bs4 import BeautifulSoup as soup
import os.path
import re

cache_directory = "html_cache\\"


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

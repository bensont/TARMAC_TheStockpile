from urllib.request import urlopen as ureq
from bs4 import BeautifulSoup as soup
import os.path
import re

cache_directory = "html_cache\\"
#function to get make html soup from url
def get_soup_from_url(url_string):
    # Create the html_cache directory if it doesn't already exists
    if not os.path.exists(cache_directory):
        os.makedirs(cache_directory)
    #if the html file doesn't already exist in the cache, open a connection
    #and then return the soup
    cache_file_name = get_cache_file_name(url_string)
    if not os.path.exists(cache_file_name):
        uClient = ureq(url_string)
        thesoup = soup(uClient.read(), "html.parser")
        with open(cache_file_name, "w", encoding="utf-8") as f:
            f.write(str(thesoup))
        uClient.close()
    #else if the file does exist in the cache, make a soup out of it
    else:
        with open(cache_file_name, "r", encoding="utf-8") as f:
            thesoup = soup(f, "html.parser")
    return thesoup

#take the last two bits of information about the url and make it into
#something that is safe to make into a file name
def get_cache_file_name(url_string):
    return cache_directory + re.findall(r'\/[^\/]+\/[^\/]+\/$', url_string)[0].replace("/", "") + ".html"

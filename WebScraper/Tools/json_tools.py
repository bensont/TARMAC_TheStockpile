import json
import re
from . import url_tools


def get_json_and_soup_from_url(url_string):
    # turn that URL into soup
    couch_soup = url_tools.get_soup_from_url(url_string)
    # get all of the scripts from said soup
    scripts = couch_soup.findAll(
        "script", language="JavaScript", type="text/javascript")
    # find the script that contains the product data
    found_script = ""
    for script in scripts:
        if str(script).find("jProductData") != -1:
            found_script = script.text
    # extract the product data JSON as a string and format it into something that python likes
    product_data_json = re.findall(
        r'[^\t]*var jProductData[^\t]*;', found_script)[0]
    # cut the beginning off
    start_index = 0
    for i in range(len(product_data_json)):
        if product_data_json[i] == "{":
            start_index = i
            break
    #cut the end off
    end_index = len(product_data_json)
    for i in reversed(range(len(product_data_json))):
        if product_data_json[i] == "}":
            end_index = i
            break
    # turn into json string
    final_json_string = product_data_json[start_index:end_index + 1]
    return (json.loads(final_json_string), couch_soup)

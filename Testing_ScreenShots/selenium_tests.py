from selenium import webdriver
#chromedriver = "/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/chrome/chromedriver"
# firefoxdriver = "/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver"
#driver=webdriver.Chrome(chromedriver)
# driver=webdriver.Firefox(firefoxdriver)

###############################################################################
#3##### Testing through the use of selenium for some of our features ##########
###############################################################################


####### DROP DOWN FEATURE ########

# Testing dropdown 1 for products
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com/")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('dropdown1_first.png')
driver.find_element_by_id("dropdown").click()
driver.get_screenshot_as_file('dropdown1_second.png')
driver.find_element_by_id("top-dropdown-item").click()
driver.get_screenshot_as_file('dropdown1_third.png')
driver.quit()

# Testing dropdown 2 for products
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com/")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('dropdown2_first.png')
driver.find_element_by_id("dropdown").click()
driver.get_screenshot_as_file('dropdown2_second.png')
driver.find_element_by_id("second-dropdown-item").click()
driver.get_screenshot_as_file('dropdown2_third.png')
driver.quit()

# Testing dropdown 3 for products
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com/")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('dropdown3_first.png')
driver.find_element_by_id("dropdown").click()
driver.get_screenshot_as_file('dropdown3_second.png')
driver.find_element_by_id("third-dropdown-item").click()
driver.get_screenshot_as_file('dropdown3_third.png')
driver.quit()

# Testing dropdown 4 for products
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com/")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('dropdown4_first.png')
driver.find_element_by_id("dropdown").click()
driver.get_screenshot_as_file('dropdown4_second.png')
driver.find_element_by_id("fourth-dropdown-item").click()
driver.get_screenshot_as_file('dropdown4_third.png')
driver.quit()

# Testing dropdown 5 for products
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com/")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('dropdown5_first.png')
driver.find_element_by_id("dropdown").click()
driver.get_screenshot_as_file('dropdown5_second.png')
driver.find_element_by_id("fifth-dropdown-item").click()
driver.get_screenshot_as_file('dropdown5_third.png')
driver.quit()

######## Navbar Icon Link Feature ###########

# Testing cart button link from nav bar
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com/product/Mirror/17")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('link_cart_first.png')
driver.find_element_by_id("link_cart").click()
driver.get_screenshot_as_file('link_cart_second.png')
driver.quit()

# Testing Account button link from nav bar
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com/product/Mirror/17")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('link_account_first.png')
driver.find_element_by_id("link_account").click()
driver.get_screenshot_as_file('link_account_second.png')
driver.quit()

####### Image/Text Links Between Pages Feature #############

# Testing redirect of category image links
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('link_category_picture_first.png')
driver.find_element_by_id("category_picture").click()
driver.get_screenshot_as_file('link_category_picture_second.png')
driver.quit()

# Testing redirect of category text links
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('link_category_text_first.png')
driver.find_element_by_id("category_link").click()
driver.get_screenshot_as_file('link_category_picture_second.png')
driver.quit()

# Testing redirect to related products
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com/product/Mirror/15")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('link_related_text_first.png')
driver.find_element_by_id("related_link").click()
driver.get_screenshot_as_file('link_related_picture_second.png')
driver.quit()

# Testing add to cart
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com/product/Mirror/17")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('add_cart_first.png')
driver.find_element_by_id("checkout-button").click()
driver.get_screenshot_as_file('add_cart_second.png')
driver.quit()

######## Login Feature ########

# Testing Login input, submit, and redirect
driver = webdriver.Firefox(executable_path='/home/user/anaconda3/lib/python3.6/site-packages/selenium/webdriver/firefox/geckodriver')
driver.set_page_load_timeout(30)
driver.get("https://the-stockpile.herokuapp.com/login")
driver.maximize_window()
driver.implicitly_wait(20)
driver.get_screenshot_as_file('login_blank.png')
driver.find_element_by_name("email").send_keys("test@test.com")
driver.find_element_by_name("password").send_keys("test")
driver.get_screenshot_as_file('login_info.png')
driver.find_element_by_id("login").click()
driver.get_screenshot_as_file('login_after.png')
driver.quit()

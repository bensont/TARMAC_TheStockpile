from Tools import json_tools

class Product():

    def __init__(self, url_string=None, copy_from=None):
        """
        Summary:
            initialize product by either copying OR from url

        Args:
            url_string (ProductBuilder)
            copy_from (Product)

        Returns:
            Product: Initialized Product

        Raises:
            ValueError: raises exception in two cases, either both arguments were given, or none were given. This operates using XOR logic. Must be one or the other.
        """
        if url_string is not None and copy_from is None:
            self.from_url(url_string)
        elif copy_from is not None and url_string is None:
            self.from_copy(copy_from)
        else:
            raise ValueError(
                "Cannot initialize a product as a copy and from a URL. Pick one.")

    def from_copy(self, copy_from):
        """
        Summary:
            Helper function to initialize from a copy

        Args:
            copy_from (Product): product to copy from

        Returns:
            Product: Initialized Product
        """
        self.__name = copy_from.get_name()
        self.__details = copy_from.get_details()
        self.__price = copy_from.get_price()
        self.__description = copy_from.get_description()
        self.__image_urls = copy_from.get_image_url()
        self.__review = copy_from.get_review()
        self.__article_id = copy_from.get_article_id()
        self.__category = copy_from.get_category()

    def from_url(self, url_string):
        """
        Summary:
            make a product from a url

        Args:
            url_string (str)

        Returns:
            Product: product with details scraped from url
        """
        # load that string into a JSON and soup
        couch_product_data_json, couch_soup = json_tools.get_product_data_from_url(
            url_string)
        smaller_chunk = couch_product_data_json['product']['items'][0]
        review = couch_soup.findAll("a", class_="ratingsCount")[0].text
        # build product
        self.__name = smaller_chunk['name']
        self.__category = couch_soup.findAll(
            "meta", attrs={'name': 'IRWStats.categoryLocal'})[0]['content']
        self.__description = smaller_chunk['type']
        self.__price = smaller_chunk['prices']['normal']['priceNormal']['priceExclVat']
        self.__details = [item['validDesign'][0] for item in couch_product_data_json['product']['items']]
        self.__article_id = couch_product_data_json['product']['partNumber']
        self.__review = review if not review == "Review" else "N/A"
        self.__image_urls = ["https://ikea.com" + item['images']['zoom'][0] for item in couch_product_data_json['product']['items']]
        self.__design_and_images = dict(zip(self.__details, self.__image_urls))

    # GETTERS
    def get_name(self):
        return self.__name

    def get_price(self):
        return self.__price

    def get_description(self):
        return self.__description

    def get_review(self):
        return self.__review

    def get_article_id(self):
        return self.__article_id

    def get_category(self):
        return self.__category

    def get_design_and_images(self):
        return self.__design_and_images

    # built-in functions
    # eq allows tests for equality with other products
    def __eq__(self, other):
        return (
            other.get_name() == self.__name
            and other.get_description() == self.__description
            and other.get_price() == self.__price
        )

    # representations of the product object
    def __str__(self):
        return (
            f"Product with:\n \
            Name: {self.__name}\n \
            Options and Images: {self.__design_and_images}\n \
            Price: {self.__price}\n \
            Description: {self.__description}\n \
            Review: {self.__review} Stars\n \
            Article ID: {self.__article_id}\n \
            Category: {self.__category}\n"
        )

    def __repr__(self):
        return (
            f"Product with:\n \
            Name: {self.__name}\n \
            Options and Images: {self.__design_and_images}\n \
            Price: {self.__price}\n \
            Description: {self.__description}\n \
            Review: {self.__review} Stars\n \
            Article ID: {self.__article_id}\n \
            Category: {self.__category}\n"
        )

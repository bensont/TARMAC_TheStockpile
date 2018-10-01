class Product():

    # Can be initialized from either another product, or a product builder
    def __init__(self, product_builder=None, copy_from=None):
        if product_builder is not None and copy_from is None:
            self.from_product_builder(product_builder)
        elif copy_from is not None and product_builder is None:
            self.from_copy(copy_from)
        else:
            print(
                "Something went wrong when trying to make a product like you specified...")

    # copy constructor helper
    def from_copy(self, copy_from):
        self.__name = copy_from.get_name()
        self.__details = copy_from.get_details()
        self.__price = copy_from.get_price()
        self.__description = copy_from.get_description()
        self.__image_url = copy_from.get_image_url()
        self.__review = copy_from.get_review()
        self.__article_id = copy_from.get_article_id()
        self.__category = copy_from.get_category()

    # constructor from the product builder helper
    def from_product_builder(self, product_builder):
        self.__name = product_builder.name
        self.__details = product_builder.details
        self.__price = product_builder.price
        self.__description = product_builder.description
        self.__image_url = product_builder.image_url
        self.__review = product_builder.review
        self.__article_id = product_builder.article_id
        self.__category = product_builder.category

    # GETTERS
    def get_name(self):
        return self.__name

    def get_details(self):
        return self.__details

    def get_price(self):
        return self.__price

    def get_description(self):
        return self.__description

    def get_image_url(self):
        return self.__image_url

    def get_review(self):
        return self.__review

    def get_article_id(self):
        return self.__article_id

    def get_category(self):
        return self.__category

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
            Details: {self.__details}\n \
            Price: {self.__price}\n \
            Description: {self.__description}\n \
            Main Image URL: {self.__image_url}\n \
            Review: {self.__review} Stars\n \
            Article ID: {self.__article_id}\n \
            Category: {self.__category}\n"
        )

    def __repr__(self):
        return (
            f"Product with:\n \
            Name: {self.__name}\n \
            Details: {self.__details}\n \
            Price: {self.__price}\n \
            Description: {self.__description}\n \
            Main Image URL: {self.__image_url}\n \
            Review: {self.__review} Stars\n \
            Article ID: {self.__article_id}\n \
            Category: {self.__category}\n"
        )

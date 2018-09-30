class Product():

    #Can only be initialized from a product builder
    def __init__(self, product_builder):
        self.__name = product_builder.name
        self.__details = product_builder.details
        self.__price = product_builder.price
        self.__description = product_builder.description
        self.__image_url = product_builder.image_url
        self.__review = product_builder.review
        self.__article_id = product_builder.article_id
        self.__category = product_builder.category

    #GETTERS
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
            Category: {self.__category}"
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
            Category: {self.__category}"
            )

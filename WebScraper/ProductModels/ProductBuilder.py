from .Product import Product


class ProductBuilder:

    # initialize all fields to default
    def __init__(self):
        self.name = "N/A"
        self.details = "N/A"
        self.price = "N/A"
        self.description = "N/A"
        self.image_url = "N/A"
        self.review = "N/A"
        self.article_id = "N/A"
        self.category = "N/A"

    # BUILDERS
    def with_name(self, name):
        self.name = name
        return self

    def with_details(self, details):
        self.details = details
        return self

    def with_price(self, price):
        self.price = price
        return self

    def with_description(self, description):
        self.description = description
        return self

    def with_image_url(self, image_url):
        self.image_url = image_url
        return self

    def with_review(self, review):
        self.review = review
        return self

    def with_article_id(self, article_id):
        self.article_id = article_id
        return self

    def with_category(self, category):
        self.category = category
        return self

    # BUILD PRODUCT FROM SELF
    def build(self):
        return Product(product_builder=self)

# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy

class Ingredient(scrapy.Item):
    name = scrapy.Field()
    measure = scrapy.Field()

class RecipeItem(scrapy.Item):
    name = scrapy.Field()
    ingredients = scrapy.Field()
    directions = scrapy.Field()
    urlName = scrapy.Field()
    imgURL = scrapy.Field()
    description = scrapy.Field()
    cuisine = scrapy.Field()
    prepTime = scrapy.Field()

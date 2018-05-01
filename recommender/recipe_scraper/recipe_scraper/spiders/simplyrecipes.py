# -*- coding: utf-8 -*-

import scrapy
from recipe_scraper.items import RecipeItem
import re
from ingredient_parser.en import parse

class Simplyrecipesspider(scrapy.Spider):
    name = "simplyrecipes"
    start_urls = ['http://www.simplyrecipes.com/recipes/course/dinner/',
     'http://www.simplyrecipes.com/recipes/course/lunch/',
     'https://www.simplyrecipes.com/recipes/course/breakfast_and_brunch/',
     'https://www.simplyrecipes.com/recipes/course/dessert/',
     'https://www.simplyrecipes.com/recipes/course/side_dish/',
     'https://www.simplyrecipes.com/recipes/course/sandwich/',
     'https://www.simplyrecipes.com/recipes/type/budget/',
     'https://www.simplyrecipes.com/recipes/type/quick/',
     'https://www.simplyrecipes.com/recipes/cuisine/african/',
     'https://www.simplyrecipes.com/recipes/cuisine/chinese/',
     'https://www.simplyrecipes.com/recipes/cuisine/german/',
     'https://www.simplyrecipes.com/recipes/cuisine/indian/',
     'https://www.simplyrecipes.com/recipes/cuisine/italian/',
     'https://www.simplyrecipes.com/recipes/cuisine/japanese/',
     'https://www.simplyrecipes.com/recipes/cuisine/korean/',
     'https://www.simplyrecipes.com/recipes/cuisine/mexican/',
     'https://www.simplyrecipes.com/recipes/cuisine/spanish/',
     'https://www.simplyrecipes.com/recipes/cuisine/thai/'
     ]

    def parse(self, response):
        recipeDescription = response.css("article.recipe").css('meta[itemprop="description"]').xpath("@content")

        recipe = response.css("div.recipe-callout")
        if recipe:
            ingredientList = response.xpath('//li[@class="ingredient"]//text()').extract()
            ingredientObjects = []
            for i in ingredientList:
                ingredientObjects.append(parse(i))
                print parse(i)

            yield RecipeItem(name = recipe.css("h2::text").extract_first(),
            urlName = response.url,
            imgURL = response.css("div.entry-content").css("div.featured-image").css("img.photo").xpath("@src").extract_first(),
            ingredients = ingredientObjects,
            ingredientsRawString = ingredientList,
            directions = response.css('div[itemprop="recipeInstructions"]').css('p::text').extract(),
            description = response.css("article.recipe").css('meta[itemprop="description"]').xpath("@content").extract_first(),

            cuisine = response.xpath('////*[@id="content"]/div[1]/article/footer/div/span[2]/span/a/span/text()').extract(),
            prepTime = response.css("span.cooktime").xpath("@content").extract_first()
            )
        else:
            links = response.css("li.recipe").css("a").xpath("@href").extract()
            if links:
                for link in links:
                    yield scrapy.Request(link, callback=self.parse)

            # If the current page is a navigation page, goes through next page
            # link until there are no more recipes to scrape
            nextLink = response.css("a.page-numbers.next").xpath("@href").extract_first()
            if nextLink:
                yield scrapy.Request(nextLink, callback=self.parse)

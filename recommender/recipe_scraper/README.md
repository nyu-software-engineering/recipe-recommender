# Recipe-scraper

## Description
this directory uses Scrapy, a Python library, to scrape
simplyrecipes.com for recipes.

## Dependencies and Setup
Must have the following installed:
- Python
- pip
- Other dependencies may be installed by running:
```
pip install -r requirements.txt
```

## Running a spider
```
scrapy crawl <spider_name> -o <output_filename>.json
```

where spider_name is the name of a spider (spider_name attribute within each
spider class) and output_filename is the desired filename.

This will run the crawler and output the results in json format which then can be inputted into a database. We are using MongoDB for this specific project.


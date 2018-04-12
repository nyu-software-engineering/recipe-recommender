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
scrapy crawl simplyrecipes -o <output_filename>.json
```
where simplyrecipes is the name assigned to the scraper

This will run the crawler and output the results in json format which then can be inputted into a database. We are using MongoDB for this specific project.


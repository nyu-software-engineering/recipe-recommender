# Kithchuation

### What are we?
> "Have you ever wanted to know what you can cook based on what’s on your kitchen?"

We are your cooking hack! We are a webapp that allows you to keep and update a virutal representation of your pantry and in return provide you with your recipe matches. We also allow you to filter for foods based on meal preferences and dietary restrictions. We recommend ingredient substitutions. Additionally, you can share your found recipes and cooked meals with friends and family! Enjoy!

### Who is this for? What are their tendancies? How did we factor this into design?
We made this app for college students who want to cook but have limited ingredients, for people who enjoy cooking who want to be trying new recipes, and for people who want to start cooking and struggle to know how to use what they’ve bought. 

We know that users want a low barrier of entry and don't want to input each item they have in their pantry. For this reason, we made a robust pantry with default quantities and units. 

We also give users more recipes than just those with matched pantry ingredients so they can gain ideas for recipes they could cook or see recipes with ingredients that they may have forgoten to put into their pantry. 

### The System
* Framework - Express 4.15.5
* Language - JavaScript
* Runtime Enviroment - node.js
* node.js libraries and middleware:
  * body-parser 1.18.2
  * cookie-parser 1.4.3
  * hbs 4.0.1
  * mongoose 4.9.2
  * mongoose-simple-random 0.4.1  
  * mongoose-url-slugs 0.2.1
  * passport 0.3.0
  * passport-local-mongoose 3.1.0
* Front end framework - Materaizlize
* Machine Learning - Sci-Kit Learn (Python)
* Scraping Recipes - Scrapy, recipe-parser

### Challenges and Lessons Learned
##### What difficulties did you expect to have when you first started, and did they occur?
We knew that parsing ingredients and units would be a challenge, we also knew that machine learning would take a lot of research.
##### Are there particular use cases in your product backlog that were not completed?
>“As a system, I would like to recommend recipes based on a user's previous history, so that the user can see more recipes they might like”

working on machine learning wasn’t relevant to work on it when we needed to get the entire back and front end somewhat working, then we ran out of time

>“As a user I want to indicate that a recipe is done”
We ran out of time, issues with units, also realization that most people won’t have all ingredients, matching ingredients one to one is difficult

##### What did you struggle the most in this project?
* Matching ingredients one to one
* Units… What quantities do we expect users to input? But we want to make sure it’s valid. No central unit for comparison, how could we compare “pinch” to “tablespoon”? 
##### How did you overcome these problems?
* Less efficient algorithm for matching pantry to recipes, so we have a limited amount of recipes that are returned. 
* Made sure we had an extensive base pantry and Leila did brute force comparison to make sure that there was an accurate unit for each
* Updating pantry units still doesn’t work 

##### Lessons learned
**What do you know now that you didn't know before?**
Hannah - Connecting to a central database that we could all refer to. This took way longer than I thought to figure out but it was very satisfying. Also, integrating libraries and simple things like connecting frontend to backend through buttons instead of forms.
Leila - I had never done any front end development, so I learned how to do all of that. I learned to always use a framework for frontend, it looks much better and is more accessible. I learned how to do redirects from page to page, posting vs. getting. Learned some database stuff. Learned javascript, html, and css.

**Was this project more or less work than you imagined at the beginning?**
Definitely more work, when we first met with Bloomberg, he acted like it would be a weekend project but THEN IT WASN’T!

**Did you learn anything interesting from working on this project?**
* Learned a lot about github, especially in terms of the project boards and issues. 
* Overall learned about working with a team, learning realistic understanding about how long things were actually going to take. 
* Working with others was something we hadn’t had to do before, had to communicate well about who was working on what



### The Team
1. **Denisa Vataksi** - NYU '18, headed to Schoology (Mobile Engineer, NYC)
Denisa worked as a full stack engineer on our project and also scraped all our recipes
2. **Leila Mardoum** - NYU '19, headed to Tableau (Software Engineering Intern, Seattle)
Leila worked on the front end using Materialize to make Kitchuation beautiful!
3. **Hannah Pedersen** - NYU '18, headed to BuildZoom (Software Engineer, San Francisco)
Hannah worked on the backend, algorithms for matching the pantry, and on the database
4. **Melissa Schiff** - NYU '18, headed to Levvel (Software Engineer / Consultant, NYC)
Melissa worked on the backend and worked to develop our machine learning

### Short History on How We Came to Be
As four fellow college students, we understand the difficulty of preparing a decent meal, having limited ingredients, limited time, and wanting to stay healthy. We just want to simplify cooking for all that enjoy cooking and those who don't so much. 

### Contributing Info
[Contribution guidelines for this project](https://github.com/nyu-software-engineering/recipe-recommender/blob/master/CONTRIBUTING.md)



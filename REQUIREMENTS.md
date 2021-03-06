## Stakeholder Interviews

**Professor Amos Bloomberg:**

_Our Q_:How would we point them to recipes? If they clicked on it, it would take them away. 

- Scraping them in is technically illegal
- We should make our own recipes to test the system with at first

_His Thoughts_ :
- Base version could be with pantry of ingredients, then match all recipes sorted by percent accuracy with items in pantry
- Allow users to enter recipes
- Express node lends itself to Mongo (database)
- Bells and whistles will make our project more full, because base is somewhat simple
- Popup: Hey, this recipe you just made used flour, want to add that to your pantry? (then, ask for quantity)
- **Should be able to share recipes with users (included in MVP)**
- **Put a recommender system in (included in MVP)**
  - Moving away from fuzzy search recommender if we have a software.
  - Don’t build one from scratch and instead integrate software that would work with node.js or use python, etc, and have it running in the background

_His Q_ : How are people going to input the items in their pantry?

- Initially have base pantry items, which they can deselect
- Will use a screen with checkboxes for common food items
  - Keep items simplified (i.e. bell pepper, not red bell pepper)
- If an item not on list, can search the database

_Our Q_ : What do you think will be the most difficult part of the project? 

- Making a well-designed, user-friendly website, and doing the additional features above the base product


**Tutor Priyanka:**

_Her Q_: If it's about the pantry, how will pantry items be displayed? Where are we going to find our database?

_Answer:_ That'll be difficult. Asked about myfitnesspal and using an open source database.

_Advice_: To start with, we should use one recipe website and allow the ingredients just needed for that

- **Start with 10 items, and one recipe to test until it completely works**

_Our Q_: Is our project enough?

_Answer_: Back end might be easy, but adding nutrition might be a good point to add more work. If you're choosing a recipe based on calories or if you're choosing a recipe based on dietary restrictions, etc would be a great added feature.

- \*\*Melissa, what type of machine learning have you done? We'll need this. Probably for matching ingredients → recipes, which shouldn't be too bad to learn

-  agrees that substitutions and other features are all things we can add.

_Our Q_: What about directing people to recipes by re-directing them to that site?

_Answer:_ It's allowed for us, but not sure about legally if we can for the real world. Ask Professor Bloomberg.

_Our Q:_ Should we buy a domain?

_Answer_: Use courant's, or check AWS if it's still 6 months free for students

_Our Q:_ What are potential downfalls?

_Answer_: Look into machine learning now, because this will be hard for recommender system. **But for now,  have database ready and UI ready first… Should at least be able to return a recipe for what ingredients you have.**

_Our Q:_ What about softwares?

_Answer_: What we were thinking is fine. Think about which Database to use though.

_Advice:_ Think about percentage of recipe match, think about "non-important" ingredients… maybe putting less weight on the items that are in smaller quantities.

**Prepared Questions to Stakeholders:**

>- Are there any other features you would like to see?
>- Are there features listed that you would rather not see?
>-  In your ideal recipe recommender,
>- Would you rather have \_\_(X)\_\_ or \_\_(Y)\_\_ (out of elements we could add)?
>  - filters
>  - preferred recipe websites
>  - **Do you care more about nutrition or more options?**
>  - **Do you care more about creating your own recipes or finding recipes online?**
>- What will be our difficulties with open source data gathering?
>- What do you think are the potential pitfalls of this project? (difficulties with the model, difficulties with similar products)
>- What kind of systems do think would suit this project?

## End-User Observations

**End-User Stereotype:**

>_“Your project may have more than one type of user, in which case you will develop multiple personas for each type of user.”_

1) People who enjoy cooking and use fitness applications to track nutrition of their recipes

2) People who don’t usually use fitness apps, but use the internet to find recipes

3) People who don’t cook but want to start cooking in order to increase their health

4) College students who want easy meals to cook and often have limited ingredients


**With "Jane", persona 1** (Hannah Interview 1)

- Really likes the idea of the pantry that you can build
- I was really in the mood for soup/stew yesterday, so I want it to still be able to say I want something specific, despite the pantry (so filters and searches are important)
- I think most people underestimate calories, so being able to search recipes WITHIN a calorie range would be good (as in, searching for a more "diet-ish" version of an item)
- I want it to be able to pull in my favorite recipe websites (has 15 recipes from websites that she always uses) and would like having something that recommended off of those.
- It just can't be overwhelming. Most websites are overwhelming, because there's way too many things, and she thinks that everything has a TON of calories.
- Recipe websites also don't rank based on difficulty. So it would be nice if it could filter based on "easy" meaning you have most ingredients (95%) and it doesn't take a lot of time.

**With "Jeanne," persona 3** (Hannah Interview 2)

- I usually don't cook because I'm lazy, so I don't want to be able to have to type in each item I buy. It would be really nice if I could just take a picture of the receipt (I then reminded her that this wasn't mobile) or have it know that I just shopped at trader Joes and pulled up all the stuff I could have purchased from Trader Joes.
- I really with it could be an app, using it on my phone seems a lot more realistic. But I like the idea
- I like the idea of it recommending recipes, maybe it could be like Pinterest: a combination of me saving my own recipes and of them recommending recipes to me.
- I'd like it to also tell me degrees of difficulty, because I'm lazy with cooking. Also, if it told me how long preparation would take, that would be incredible. I'm only going to make things if it's 30 mins or less.

**With "Alisa," persona 1** (Leila Interview 1)

- I have to think of something to cook every night, but I don't have a lot of time to plan so it's nice to have a quick lookup.
- I don't mind it just being a website as long as I can look it up and use it on my phone.
- I usually start my meals with a certain bend, like "I want mediterranean food, or I want Thai food." I'd love to be able to search based on that. I have a ton of spices in my cabinet to do all sorts of foods, so I like to change it up a lot.
- I basically always use allrecipes.com.
- Would like both nutrition information for meals, but if we were to choose between the two, thinks filers are a lot more important (vegetarian, vegan, gluten free, asian, persian, middle eastern etc.)

**With "Kayla," persona 4** (Leila Interview 2)

- Doesn’t think the nutrition element is as important as having food filters because figures people who are tracking their nutrition very carefully already have a good idea of which recipes are healthy
  - Don’t want to force people who don’t care as much about that kind of stuff to look at exactly how many calories and grams of fat, etc. they are eating
  - The average person (not a fitness junkie) cares more about the type of food they are making
  - Maybe include an overall rating (A, B, C...F) but not too much detail
  - Should primarily be a recipe and cooking app, not a fitness app
- Not one particular website that I use, usually just google and go from there
- myfitnesspal relatively easy to use, but never got into it much


**With "Jess," persona 1** (Denisa Interview 1)

- I don’t mind it being a website. I look up recipes normally on a computer anyways!
- I google search recipes that I’ve seen on menus and a lot of times allofrecipes.com is what i end up using
- “Yes, I count calories”
- Nutritional vs Broad Range? 
  - Broad Range bc I envision this site being a place where I go when I have a very limited amount of ingredients and want to make the most of it
  - If you focus on nutritional as opposed to broad range it might take the big picture out of the site.


**With "Cole," persona 1** (Denisa Interview 2)
- “I want to invest in this”
- I use recipes.com 
- “I wish it was easier to find recipes that I like”
- “I don’t care that it’s not an app although an app would be cool”
- Nuritional
  - “It’s trendy” It caters to more people
  - It’s different from other recipe sites out there


**With "Karen," persona 2** (Melissa Interview 1)
- Likes idea of filters based on cuisine types, cook time, difficulty level
- Wants to have a good range of (recipe) choices, especially ones based on previously cooked/liked recipes
  - Lots of other recipe websites are very broad in their search results or overwhelming and unhelpful
- Ideally would not have to spend lot of time in setting up account and filling out pantry 
  - filling out pantry sounds like tedious task if have to input everything
- Wouldn’t use nutrition aspects to count calories necessarily
  - would like it for other nutritional aspects (vitamin levels, fats, protein, etc.)


**With "Anastasia," persona 1 & 4** (Melissa Interview 2)
- Dislike about fitness app she currently has: it’s kind of guesswork 
  - Anyone can put in anything and it shows varying levels of nutritional information based on what other people have inputted
  - Does not have standardized nutrient or calorie information (user doesn’t know if input information is correct)
  - Finds that it doesn’t accurately track nutritional aspects other than calories
- Our feature ideas she liked: offers recipes based on meals inputted in the past 
- Filters more important than nutritional aspects, but would use nutritional aspects if available
- If taking time to cook at home, nutrition not too important (not adding too much salt or bad fats, etc. like would find from restaurant foods)
- Loves idea of recommending substitutions (especially substituting other things for meats without changing recipes too much)
- Filter: spice level (example: curries, doesn’t want to browse hundreds to find one that isn't spicy)


## Use Cases

- Title - Register a User - Actor - User of the system
  - Scenario - User signs up: makes a username and valid password and provides an email and name. System checks that password is secure and that username is unique.  System will send a confirmation email of sign up and redirect user to log into account.

- Title - Add ingredient to pantry
  -  Actor - User of the system
  -  Scenario - User types in an ingredient item and system matches ingredient with ingredients in the database. User is requested to put amount or size (if applicable) of ingredient. System adds ingredient to Pantry. System matches new recipes with added ingredient and potential recipes are added to the Recipe List.

- Title - Change quantity of ingredient
  - Actor -  User of the system
  - Scenario - User chooses ingredient in pantry. User adjusts quantity of ingredient. System adjusts matching recipes in Recipe List.

- Title -  Generate list of recipes
  - Actor - System
  - Scenario - System has list of pantry items User has. System goes through recipe list and in each recipe matches if the recipe ingredients are found (in size and quantity) in user pantry. System returns to user list of recipes that match ingredients in their pantry.

- Title - Adjust the Recipe (did not use, substituted, or increased/decreased amount of ingredient)
  - Actor - User of the system
  - Scenario - After marking a recipe as made, the user will have the chance to edit each of the ingredients listed in that recipe. This way, if the user used more or less of an ingredient, or substituted an item for something else, their pantry will be reduced to accurately show this.

- Title - Indicate recipe completed
  - Actor - User
  - Scenario - User clicks button to indicate that recipe has been made. A menu comes up to adjust any ingredients and quantities that differ from the recipe.

- Title - Reduce pantry quantity
  - Actor - System
  - Scenario -  After user indicates that a recipe has been made, system reduces relevant ingredients in recipe by quantity indicated in recipe. System updates recipe list.

- Title - Save recipes
  - Actor - User
  - Scenario - User favorites/stars a recipe. Systems adds recipe to list of saved recipes.

- Title - Create pantry base
  - Actor - System
  - Scenario - Upon account creation, system generates a list of base ingredients a user should have in their pantry (flour, butter, etc). System adds base ingredients to pantry.

- Title - Edit base pantry (in beginning)
  - Actor - User
  - Scenario - User goes through list of basic pantry items (system created in different use case) and indicates which they do and do not have. System goes through and updates pantry items based on response from user.

[Click here](https://drive.google.com/file/d/1Z3zUPylsBnXVGXdugFW3PfcK8o7tBIpc/view?usp=sharing) to see UML Use Case Diagram


## Domain Modeling: 

See domain model [here](https://drive.google.com/file/d/1TImxbzkL7YW1AkD_m0-_Hrn9NIpGUFGm/view?usp=sharing)

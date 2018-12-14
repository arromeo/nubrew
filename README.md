# Universal Values

1. Save time
2. Feel good
3. Look good
4. Not save money because beer gets expensive

# User Story

1. As a user, I want to be able to keep track of my favorite beers/least favorite beers.
2. As a user, I'd like to be recommended beers based on my favorites (single or flights).
3. As a user, I'd like to be recommended beers based on the community's favorites (single or flights).
4. As a user, I'd like the option to try new beers that I've never tried before. 
5. As a user, I'd like to be recommended beers in an establishment/store based on personal/community favorites.
6. As a user, I'd like an email if a new product hits the market that meets the requirements set by my favorites (feature).
7. As a user, I'd like to be able to take a photo of a beer label to enter it into my favorites [recommendations/voting prompts/favorites].
8. As a user, I'd like to be able to search by text the drink for [recommendations/voting prompts/favorites].
9. As a user, I'd like to be recommended locations via map based on personal/community favorites (FEATURE).

# Business User Story (feature)

1. As a business, I'd like to send notifications if a new product is released.
2. As a business, I'd like to track the community's favorites.
3. As a business, I'd like to host events and invite community members.

# ERD

- Categories (style of beer) 
  - Amber
  - Brown
  - Cream
  - IPA
  - Kolsch
  - Pale
  - Scotch
  - Dunkleweizen
  - Hefeweizen
  - Wheat
  - Lager
  - Pilsner
  - Radler
  - Shandy
  - Pale Lager
  - Sour
  - Lambic
  - Stout
  - Porter
  - Belgian
  - Saison
  - Fruit
  - ... + (?)

- Seasonal
  - Spring
  - Summer
  - Fall
  - Winter
  - All

- Beers
  - Categories_ID (FK)
  - Seasonal_ID (FK)
  - IBU (#)
  - ABV (%)
  - Name
  - Description
  - Vote_count (for community favorites, cannot be less than 0)
  - Image
  - Search Image (feature?)

- Breweries
  - Name
  - Description
  - Location

- Beers_Breweries (collaboration)
  - Brewery_ID (FK)
  - Beer_ID (FK)

- Beers_Stores (join)
  - Store_id (FK)
  - Beer_id (FK)

- Stores
  - Name
  - Location
  - Hours

- Events (feature)
  - Store_ID (FK)
  - Name
  - Details
  - Time

- Users
  - First_Name
  - Last_Name
  - Email
  - Password

- BeersUserTried *
  - User_ID (FK)
  - Beer_ID (FK)
  - Vote (-1: disliked, 0: no-vote, 1: liked)
  - Favorite (boolean)

# Tech Stack

1. React-Native (Mobile)
2. React-native-camera (module)
3. PSQL + Knex
4. NodeJS + Express + Fetch
5. SASS
6. Researching Google cloud image recognition and AutoML

# Routes

From Index
	1. We should see the details of nearby events with an image

	2. The top community beer (image and name)
		A. Clicking brings up details page on that particular beer.
	3. Get recommendation button
		A. Displays a list of recommended beers that have yet to be tried.
		B. Same as 6Ba.
	4. Search button in bottom nav to prompt a search
		A. A text field to enter in search terms.
		B. A button to search via photo
			a. The camera screen pops up with a photo button on bottom
			b. Back button in the upper left.
		C. Option to search by beer, store, or possibly brewery
			a. Beer search would bring up list of stores
			b. Store search would bring up recommendations based off of store inventory
			c. Brewery will bring up a list of stores?
	5. Rate your drink to prompt a vote
		A. A text field to search by name
		B. A camera icon button below to search by photo of bottle.
			a. Based off of the search, it displays a stored picture of the bottle, name and brewery.
			b. If search unsuccessful, redirects back to search.
			c. If search has more than one result, prompt for user clarification.
	6. Favorites button to get the previously favorited drink.
		A. Quick search to filter results.
		B. Displays a list of previously favorited beers.
			a. Clicking the beer opens a details page that will display buttons to find.
				aa. Each line would have an option to remove.
	7. Profile button to log in/log out/view profile.
		A. If not logged in it prompts for credentials
		B. If logged in displays brief user profile
		C. Log out button near bottom.





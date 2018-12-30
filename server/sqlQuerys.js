import { isBuffer } from "util";

// list of beers that specific users have tried
SELECT * FROM beers_users_tried
WHERE user_id = [user_id];

// list of beers that user has voted positive to
SELECT beer_id FROM beers_users_tried 
WHERE user_id = [user_id]
AND vote = 1;

// list of beers by community votes that user has not tried
SELECT * FROM beers
WHERE id NOT IN (SELECT beer_id FROM beers_users_tried 
            WHERE user_id = [user_id]
            AND vote = 1)
ORDER BY vote_count DESC
LIMIT 5;

// get count of category of beers that users liked (70% of recommendations)
SELECT category_id, COUNT(category_id) AS category_count FROM beers
JOIN beers_users_tried ON beers.id = beer_id
WHERE beers.id IN (SELECT beer_id FROM beers_users_tried 
                  WHERE user_id = 1
                  AND vote = 1)
GROUP BY category_id;

// get count of category of beers that users disliked (10% of recommendations)
SELECT category_id, COUNT(category_id) AS category_count FROM beers
JOIN beers_users_tried ON beers.id = beer_id
WHERE beers.id IN (SELECT beer_id FROM beers_users_tried 
                  WHERE user_id = 1
                  AND vote = -1)
GROUP BY category_id;


// average of IBU of drinks user likes (+- 10, 20%)
SELECT AVG(ibu) AS average_ibu_liked FROM beers
WHERE beers.id IN (SELECT beer_id FROM beers_users_tried 
                  WHERE user_id = 1
                  AND vote = 1);

// average of IBU of drinks user dislikes (+- 10, 10%)
SELECT AVG(ibu) AS average_ibu_disliked FROM beers
WHERE beers.id IN (SELECT beer_id FROM beers_users_tried 
                  WHERE user_id = 1
                  AND vote = -1);


// this is the list of beers to work with
SELECT beers.name, beers.id, ibu, category_id, vote_count FROM beers
WHERE beers.id NOT IN (SELECT beer_id FROM beers_users_tried
                      WHERE user_id = 1)
                  
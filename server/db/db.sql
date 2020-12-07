CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating >=1 and rating <= 5)
);

SELECT 
   restaurant_id,
   count(restaurant_id)
FROM 
   reviews
GROUP BY 
   restaurant_id;

select *
from restaurants
    left join(
        select restaurant_id,
            count(*),
            TRUNC(AVG(rating), 1) as average_rating
        from reviews
        group by restaurant_id
    ) reviews on restaurants.id = reviews.restaurant_id;

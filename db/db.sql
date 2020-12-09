CREATE TABLE IF NOT EXISTS restaurants (
    id BIGINT NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT check(price_range >=1 and price_range <= 5)
);


CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating >=1 and rating <= 5)
);
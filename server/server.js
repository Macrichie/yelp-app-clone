require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

// environment
const port = process.env.PORT || 3000;

// middleware for cross origin request
app.use(cors());
// middleware to make res.body available for use
app.use(express.json());

// GET all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurantRatingData = await db.query(
      "select * from restaurants left join(select restaurant_id, count(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
    );

    res.status(200).json({
      status: "success",
      results: restaurantRatingData.rows.length,
      data: {
        restaurants: restaurantRatingData.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// GET a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    //using parameterized query
    const restaurant = await db.query(
      "select * from restaurants left join(select restaurant_id, count(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a new Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  //using parameterized query
  try {
    const result = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create new review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  //using parameterized query
  try {
    const newReviews = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReviews.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE restaurants
    SET name = $1, location = $2, price_range = $3
    WHERE id = ${req.params.id}
    RETURNING *`,
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query("delete from restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

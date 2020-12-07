import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReview from "../components/addReview/AddReview";
import Reviews from "../components/reviews/Reviews";
import StarRating from "../components/starRating/StarRating";
import { RestaurantsContext } from "../contextAPI/RestaurantsContext";

function RestaurantsDetailsPage() {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response);
        setSelectedRestaurant(response.data.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurant.name.toUpperCase()}
          </h1>
          <div class="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span class="text-warning ml-1">
              {selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : "(0)"}
            </span>
          </div>

          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
        </>
      )}
      <AddReview />
    </div>
  );
}

export default RestaurantsDetailsPage;

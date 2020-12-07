import React from "react";
import AddRestaurant from "../components/addRestaurant/AddRestaurant";
import Header from "../components/header/Header";
import RestaurantList from "../components/restaurantList/RestaurantList";

function Home() {
  return (
    <div className="home">
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
}

export default Home;

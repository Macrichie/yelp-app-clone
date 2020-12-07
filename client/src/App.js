import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestaurantsContextProvider } from "./contextAPI/RestaurantsContext";
import Home from "./routes/Home";
import RestaurantsDetailsPage from "./routes/RestaurantsDetailsPage";
import UpdatePage from "./routes/UpdatePage";

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route
              exact
              path="/restaurants/:id"
              component={RestaurantsDetailsPage}
            />
            <Route
              exact
              path="/restaurants/:id/update"
              component={UpdatePage}
            />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;

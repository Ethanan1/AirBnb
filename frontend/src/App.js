import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsList from "./components/SpotsList/SpotsList";
import SpotForm from "./components/SpotForm/SpotForm";
import SpotDetail from "./components/SpotDetail/SpotDetail";
import EditSpotForm from "./components/EditSpotForm/EditSpotForm"
import ReviewForm from "./components/ReviewForm/ReviewForm";
import ReviewsList from "./components/ReviewsList/ReviewsList";
import ReviewDetail from "./components/ReviewDetails/ReviewDetails";
import HomePage from "./components/HomePage";
import AboutPage from "./components/About";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path ="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">.
            <SignupFormPage />
          </Route>
          <Route exact path ='/spots/:spotId'>
            <SpotDetail />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route>
          <Route exact path ='/spots'>
            <SpotsList />
            <SpotForm />
          </Route>
          <Route exact path ='/spots/:spotId/reviews'>
            <ReviewsList />
            <ReviewForm />
          </Route>
          <Route exact path ='/reviews'>
            <ReviewDetail />
          </Route>
        </Switch>

      )}
    </>
  );
}

export default App;

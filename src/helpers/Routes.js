import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../views/Home';
import Boards from '../views/Boards';
import PinDetails from '../views/PinDetails';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import NotFound from '../views/NotFound';
import SearchResults from '../views/SearchResults';

// The PrivateRoute function is creating a private route and returing the specified route based on the props

// We specify the specific props we want to use in the routeChecker and pass the rest with the spread
// could pass just props in argument but then would have to use dot notation, so we are destructuring
const PrivateRoute = ({ component: Component, user, ...rest }) => {
  // when we call this function in the return, it is looking for an argument. `props` here is taco.
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
    // this render method is one we can use instead of component. Since the components are being dynamically created, we use render. Read the docs for more info: https://reactrouter.com/web/api/Route/render-func

  // Just like in the routes if we want the dynamically rendered component to have access to the Router props, we have to pass `props` as an argument.
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

// example of how you can use the route function and specify props
// const SuperPrivateRoute = ({ component: Component, user, ...rest }) => {
//   // when we call this function in the return, it is looking for an argument. `props` here is taco.
//   const routeChecker = (taco) => (user.admin
//     ? (<Component {...taco} user={user} />)
//     : (<Redirect to={{ pathname: '/super-private', state: { from: taco.location } }} />));
//     // this render method is one we can use instead of component. Since the components are being dynamically created, we use render. Read the docs for more info: https://reactrouter.com/web/api/Route/render-func

//   // Just like in the routes if we want the dynamically rendered component to have access to the Router props, we have to pass `props` as an argument.
//   return <Route {...rest} render={(props) => routeChecker(props)} />;
// };

export default function Routes({ user }) {
  return (
      <Switch>
        <Route
          exact
          path='/'
          component={() => <Home user={user} />}
        />
        <PrivateRoute
          exact
          path='/pins'
          component={Pins}
          // since we are checking if a user is authed, we have to pass the user as a props to Private Route so that it can determine if the route should be rendered or redirected. We do this in every route that uses Private Route
          user={user}
        />
        <PrivateRoute
          exact
          path='/pin-details/:id'
          component={PinDetails}
          user={user}
        />
        <PrivateRoute
          exact
          path='/boards/:id'
          component={SingleBoard}
          user={user}
        />
        <PrivateRoute
          exact
          path='/search/:term/:type'
          component={SearchResults}
          user={user}
        />
        <PrivateRoute
          exact
          path='/boards'
          component={Boards}
          user={user}
        />
        <Route component={NotFound} />
      </Switch>
  );
}

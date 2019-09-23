/* eslint-disable react/prop-types */
import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Redirect } from 'react-router-dom';
import { POST_PATH } from 'api/paths';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from 'store/actions/session';
import { hasToken } from 'helpers/token';
import queryString from 'query-string';

import Home from 'pages/Home';
import Login from 'pages/Login';
import ExampleForm from 'pages/ExampleForm';

import history from './history';
import { ExtendRoute } from './util';

function CallUser({ children }) {
  const on = useDispatch();
  const user = useSelector((state) => state.app.session.user);

  React.useEffect(() => {
    on(setUser({ id: 1, name: 'juan' }));
  }, []);
  if (!user.id) return null;
  return (
    <div>
      CallUser
      {children}
    </div>
  );
}

function CheckToken({ children }) {
  const [loaded, setLoaded] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    fetch(POST_PATH)
      .catch(() => {
        localStorage.clear();
        setRedirect(true);
      })
      .finally(() => setLoaded(true));
  }, []);
  if (!loaded) return null;
  if (redirect) return <Redirect to="/login" />;
  return (
    <div>
      CheckToken
      {children}
    </div>
  );
}

function AppRouter(props) {
  const user = useSelector((state) => state.app.session.user);
  if (user.id) return <Redirect to={queryString.parse(props.location.search).from} />;
  return <Redirect to="/login" />;
}

function OnlyWithUser({ children, ...rest }) {
  const user = useSelector((state) => state.app.session.user);
  if (!user.id) return <Redirect to={`/app-router?from=${rest.location.pathname}`} />;
  return children;
}

function RedirectIfHasToken({ children }) {
  if (hasToken()) return <Redirect to="/app-router" />;
  return children;
}

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <ExtendRoute
        exact
        path="/app-router"
        middelwares={[CheckToken, CallUser]}
        component={AppRouter}
      />
      <ExtendRoute
        exact
        path="/home"
        middelwares={[OnlyWithUser]}
        component={Home}
      />
      <ExtendRoute
        exact
        path="/login"
        middelwares={[RedirectIfHasToken]}
        component={Login}
        redirectOnToken="/app-router"
      />
      <ExtendRoute
        exact
        path="/form"
        middelwares={[OnlyWithUser]}
        component={ExampleForm}
      />
      <ExtendRoute component={() => <div>404</div>} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;

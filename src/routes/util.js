/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';

export const ExtendRoute = ({ component: Component, ...rest }) => {
  const { middelwares } = rest;

  if (Array.isArray(middelwares)) {
    delete rest.middelwares;
    let WapperComponent = React.cloneElement(<Component />, rest);
    for (let i = middelwares.length - 1; i >= 0; i -= 1) {
      const MiddleComp = middelwares[i];
      WapperComponent = React.cloneElement(<MiddleComp />, rest, WapperComponent);
    }

    const Result = () => WapperComponent;
    return (
      <Route
        {...rest}
        render={(routeProps) => <Result {...routeProps} />}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(routeProps) => (<Component {...routeProps} />)}
    />
  );
};

import React, { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  isAuthorized: boolean;
  children: ReactNode;
}

export const PrivateRoute = (props: Props) => {
  const { isAuthorized, children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

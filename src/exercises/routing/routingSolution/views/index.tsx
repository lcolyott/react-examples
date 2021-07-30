import React, { useEffect } from "react";
import { Switch, Route, RouteProps, RouteComponentProps, RouteChildrenProps, Link } from "react-router-dom";

interface AppRoute extends Pick<RouteProps, "path" | "exact" | "component" | "render"> {
    color?: string;
};

type AppRouteComponentProps = RouteComponentProps & { color?: string };

const renderRoute = (route: AppRoute) => {
    let { component, color, render, ...rest } = route;
    let Component: React.ElementType<AppRouteComponentProps> = component as React.ElementType<AppRouteComponentProps>;

    return <Route
        render={(routeProps) => {
            return (
                <Component {...routeProps} color={color} />
            )
        }}
        {...rest}
    />
};

const View: React.FunctionComponent<AppRouteComponentProps> = (props) => {
    return (
        <div
            className={"view"}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: props.color ?? "purple"
            }}
        >
            View {`${props.location.pathname}`}
            {props.children}
        </div>
    );
};

export const viewRoutes: AppRoute[] = [
    {
        path: "/",
        exact: true,
        component: View,
    },
    {
        path: "/1",
        exact: true,
        component: View,
        color: "dodgerblue",
    },
    {
        path: "/2",
        exact: true,
        component: View,
        color: "crimson",
    },
    {
        path: "/3",
        exact: true,
        component: View,
        color: "salmon",
    }
];

const renderRoutes = viewRoutes.map((route, index) => (renderRoute(route)));

export default renderRoutes;
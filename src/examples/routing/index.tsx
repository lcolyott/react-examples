import React from "react";
import routes from "./routes";
import { Route, RouteComponentProps, RouterProps, RouterState, RouteSwitchProps } from "./types";
import { ViewProps } from "./views";

const RouteSwitch = (props: RouteSwitchProps) => {
    const { location, routes } = props;

    const renderRoute = (route?: Route) => {
        if (!route) { return };

        let Component = route.component as React.ElementType<RouteComponentProps<ViewProps>>;

        return (
            <Component {...route.componentProps}>
                Location: {location}
            </Component>
        );
    };

    return (
        <div>
            {renderRoute(routes?.find((route) => route.path === location))}
        </div>
    );
};

class HashRouter extends React.PureComponent<RouterProps, RouterState> {
    constructor(props: RouterProps) {
        super(props);
        this.state = {
            location: window.location.hash
        };

        this.hashListener = this.hashListener.bind(this);
        this.stripHash = this.stripHash.bind(this);
    };

    stripHash = (hash: string | undefined) => {
        return hash?.split('#')[1] ?? "/";
    };

    hashListener = (event: HashChangeEvent) => {
        this.setState({ location: window.location.hash });
    };

    componentDidMount() {
        window.addEventListener("hashchange", this.hashListener);
    };

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.hashListener)
    };

    render() {
        return (
            <div>
                <RouteSwitch
                    routes={this.props.routes}
                    location={this.stripHash(this.state.location)}
                />
            </div>
        );
    };
};

export default function RoutingExample() {
    return (
        <div className={"Solution"}>
            <h1>Custom Routing Example</h1>
            <div style={{ display: "flex", flexDirection: "row", border: "1px solid rgba(0,0,0,.12)" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "4rem", borderRight: "1px solid rgba(0,0,0,.12)" }}>
                    {routes.map((route, index) => (
                        <a href={`#${route.path}`} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1, borderBottom: "1px solid rgba(0,0,0,.12)" }}>
                            {route.path}
                        </a>
                    ))}
                </div>
                <HashRouter routes={routes} />
            </div>
        </div>
    );
};
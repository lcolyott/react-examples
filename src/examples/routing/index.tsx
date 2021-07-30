import React from "react";
import routes, { Route } from "./routes";

interface RouteSwitchProps {
    location?: string;
    routes?: Route[];
};

const RouteSwitch = (props: RouteSwitchProps) => {
    const { location, routes } = props;

    const renderRoute = (route: Route | undefined) => {
        if (!route) { return };

        let Component = route.component;

        return (
            <Component >
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

interface RouterProps {
    basename?: string;
    routes: Route[];
};

interface RouterState {
    location?: string;
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
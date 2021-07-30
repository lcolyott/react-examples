import React from "react";
import { HashRouter, Switch, Route, HashRouterProps, Link } from "react-router-dom";
import renderRoutes, { viewRoutes } from "./views";
import "./index.scss";

// HashRouter uses a hash to route around the App
// A switch contains routes and allows us to redirect between them
// A route defines an element to render at a given URL

// RouterProps extends HashRouterProps in order to pass necessary props to wrapped HashRouter
interface RouterProps extends HashRouterProps { };
interface RouterState { };

class RouterSolution extends React.PureComponent<RouterProps, RouterState> {
    constructor(props: RouterProps) {
        super(props);
        this.state = {};
    };

    /**
     * Sets the window.location.hash
     * @param to Hash location to route to
     */
    routeTo(to: string) {
        window.location.hash = to;
    };

    //#region Component Lifecycle Callbacks
    componentDidMount() { };

    componentDidUpdate() { };

    componentWillUnmount() { };

    render() {
        return (
            // Spreading props on HashRouter as HashRouterProps in order to ignore all props not within HashRouterProps
            <HashRouter {...(this.props as HashRouterProps)}>
                <div className={"root"}>
                    <div className={"nav"}>
                        {viewRoutes.map((route, index) => (
                            <button
                                key={index}
                                onClick={() => this.routeTo(route.path as string)}
                            >
                                {route.path}
                            </button>
                        ))}
                    </div>
                    {renderRoutes}
                </div>
            </HashRouter>
        );
    };
    //#endregion
};

export default RouterSolution;
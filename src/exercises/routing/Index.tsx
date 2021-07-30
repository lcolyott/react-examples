import React from "react";
import RouterExercise from "./routingExercise";
import RouterSolution from "./routingSolution";

function RoutingExercise() {
    return (
        <RouterExercise />
    );
};

function RoutingSolution() {
    return (
        <RouterSolution />
    );
}

function Routing() {
    return (
        <React.Fragment>
            <div className={"Solution"}>
                <RoutingSolution />
            </div>
            <div className={"Exercise"}>
                <RoutingExercise />
            </div>
        </React.Fragment>
    );
};

export { RoutingExercise, RoutingSolution };
export default Routing;
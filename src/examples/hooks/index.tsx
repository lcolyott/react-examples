import React, { useEffect } from "react";
import "../examples.scss";

const FunctionComponent: React.FunctionComponent<any> = (props: { value: number }) => {
    // useState allows us to store state in a stateless functional component
    const [state, setState] = React.useState<number>(props.value);

    /**
     * The useEffect hook can be used like a component lifecycle function such as "componentDidMount" or "componentDidUpdate"
     * If we put nothing into the dependency array, useEffect will function as "componentDidMount"
     * @see https://reactjs.org/docs/hooks-effect.html
     */
    useEffect(() => {
        console.log("Component was mounted to the DOM!");
    }, []);

    // By putting "state" into the dependency array, this useEffect will be called any time state changes its value
    useEffect(() => {
        console.log("State was changed!")
    }, [state]);

    const incrementState = () => {
        setState(state + 1);
    };

    const decrementState = () => {
        setState(state - 1);
    };

    return (
        <div className={"Component"}>
            <div>Props: {props.value}</div>
            <div>State: {state}</div>
            <div className={"Actions"}>
                <button onClick={decrementState}>
                    -
                </button>
                <button onClick={incrementState}>
                    +
                </button>
            </div>
        </div>
    );
};

export default function HooksExample() {
    return (
        <div className={"Solution"}>
            <h1>Hooks Example</h1>
            <FunctionComponent value={5} />
        </div>
    );
};
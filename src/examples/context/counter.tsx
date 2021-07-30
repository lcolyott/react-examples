import React, { PropsWithChildren } from "react";
import { useEffect } from "react";
import MathUtils from "../../utilities/math";
import { CounterContextProvider } from "./context";
import "./counter.scss";

export default function Counter(props: PropsWithChildren<any>) {
    const [state, setState] = React.useState<number>(0);

    useEffect(() => {
        console.log(MathUtils.normalize(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, state));
    }, [state]);

    // Constrain whatever value we received to be between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER
    const constrainState = (val: number) => {
        setState(
            MathUtils.clamp(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, val)
        );
    };

    const increment = () => {
        console.log("Incrementing Counter");
        constrainState(state + 1);
    };

    const decrement = () => {
        console.log("Decrementing Counter");
        constrainState(state - 1);
    };

    const incrementBy = (val: number) => {
        console.log(`Incrementing Counter By ${val}`);
        constrainState(state + val);
    };

    const decrementBy = (val: number) => {
        console.log(`Decrementing Counter By ${val}`);
        constrainState(state - val);
    };

    const setCounter = (val: number) => {
        console.log(`Setting Counter To ${val}`)
        constrainState(val);
    }

    return (
        <div className={"Counter"}>
            <div className={"Display-Container"}>
                <div className={"Display"}>
                    <label className={"VALUE"}>{state}</label>
                    <label className={"MIN"}>MIN</label>
                    <label className={"ZERO"}>ZERO</label>
                    <label className={"MAX"}>MAX</label>
                    <div
                        className={"Arrow-Container"}
                        style={{
                            transform: `rotate(${(90 * MathUtils.normalize(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, state))}deg)`
                        }}
                    >
                        <div className={"Arrow"} />
                    </div>
                </div>
            </div>
            <CounterContextProvider
                // Props has children on it, so this will allow our Provider to render all child components of the "Counter" component
                {...props}
                value={{
                    value: state,
                    increment,
                    decrement,
                    incrementBy,
                    decrementBy,
                    setCounter
                }}
            />
        </div>
    );
};
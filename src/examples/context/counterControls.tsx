import React from "react";
import { useEffect } from "react";
import { CounterContextConsumer } from "./context";
import "./controls.scss"

export default function CounterControls() {
    const [val, setVal] = React.useState<number>(0);

    // every time "val" is updated, print it to the console
    useEffect(() => {
        console.log("Val was changed!", val);
    }, [val])

    // Parse the value to an integer from our input and constrain it to either be '0' if it's empty, or whatever value it contains
    const parseInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value)

        // Create a lambda expression or "Anonymous Function" to constrain the input
        let constrainValue = (value: string): number => {
            // If the target value is empty or undefined, return 0, else parse the target value
            return [undefined, ""].includes(value) ?
                0 : parseInt(value, 10)
        };

        setVal(constrainValue(event.target.value));
    };

    return (
        <CounterContextConsumer>
            {(context) => (
                <div className={"ControlsRoot"}>
                    <div>
                        <button
                            onClick={context.decrement}
                        >
                            -
                        </button>
                        <button
                            onClick={context.increment}
                        >
                            +
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() =>
                                context.setCounter?.(Number.MIN_SAFE_INTEGER)
                            }
                        >
                            MIN
                        </button>
                        <button
                            onClick={() =>
                                context.setCounter?.(0)
                            }
                        >
                            ZERO
                        </button>
                        <button
                            onClick={() =>
                                context.setCounter?.(Number.MAX_SAFE_INTEGER)
                            }
                        >
                            MAX
                        </button>
                    </div>
                    <div>
                        {/* attribute "pattern" takes a regex string that will only allow input that matches that pattern */}
                        <input type={"text"} pattern={"[0-9]*"} value={val} onChange={parseInput} />
                        <button
                            onClick={() => {
                                context.decrementBy?.(val);
                                setVal(0);
                            }}
                        >
                            Decrement By
                        </button>
                        <button
                            onClick={() => {
                                context.incrementBy?.(val);
                                setVal(0);
                            }}
                        >
                            Increment By
                        </button>
                    </div>
                </div>
            )}
        </CounterContextConsumer>
    );
};
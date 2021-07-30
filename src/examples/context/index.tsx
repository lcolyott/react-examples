import React from "react";
import Counter from "./counter";
import CounterControls from "./counterControls";

export default function ContextExample() {
    return (
        <div className={"Solution"}>
            <h1>Context Example</h1>
            <Counter >
                <CounterControls />
            </Counter>
        </div>
    );
};
import React from "react";

// Here we define what our context will store as well as any callback method signatures we wish to give consumers access to
interface CounterContext {
    value: number;
    increment: () => void;
    decrement: () => void;
    incrementBy: (val: number) => void;
    decrementBy: (val: number) => void;
    setCounter: (val: number) => void;
};

// The "Partial" utility type changes all fields on a type to become nullable
const counterContext = React.createContext<Partial<CounterContext>>({});

export const CounterContextProvider = counterContext.Provider;
export const CounterContextConsumer = counterContext.Consumer;

export default counterContext;
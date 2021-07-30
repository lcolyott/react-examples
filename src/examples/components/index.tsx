import React, { useEffect } from "react";
import "../examples.scss"

/**
 * Interfaces define the "shape" or "values" of an object
 * @see https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#interfaces
 */
export interface Props {
    value?: string | number;
};

/**
 * Using the 'type' keyword, we can perform more advanced type operations than by using an interface. 
 * This will serve the same purpose as an interface.
 * @see https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
 * @see https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
 * @see https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 * Here, I am defining a type of "State", and it takes an optional generic. The default generic is set to {}. Which essentially means "nothing".
 * I am doing this so that I can set the generic of "State" to our "Props". This will allow me to implicitly store my prop variables into state.
 */
export type State<P = {}> = P & {};

// Functional components do not have state without using hooks.
// This is a standard functional component. You don't need to wrap props with React.PropsWithChildren, but doing so gives you access to the "children" prop.
export function FunctionComponent1(props: React.PropsWithChildren<Props>): JSX.Element {
    return (
        <div className={"Component"}>
            <div>Functional Component 1</div>
            <div>Props: {props.value}</div>
        </div>
    );
};

// Functional components do not have state without using hooks.
// This is a functional component using React's built in FunctionComponent interface. Implicitly gives access to "children" prop.
export const FunctionComponent2: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div className={"Component"}>
            <div>Functional Component 2</div>
            <div>Props: {props.value}</div>
        </div>
    );
};

// Class components can contain state without the use of hooks.
// Class components will rerender every time the "State" is updated, regardless of it the values has actually changed.
export class ClassComponent extends React.Component<Props, State<Props>> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...props
        };
    };

    //#region Component Lifecycle Callbacks

    // "componentDidMount" is called whenever this component is mounted to the DOM
    componentDidMount() { };

    // "componentDidUpdate" is called when the state of this object changes
    componentDidUpdate() { };

    // "componentWillUnmount" is called right before this component is unmounted from the DOM
    componentWillUnmount() { };

    render() {
        return (
            <div className={"Component"}>
                <div>Class Component</div>
                <div>Props: {this.props.value}</div>
                <div>State: {this.state.value}</div>
            </div>
        );
    };
    //#endregion
};

// Pure components are identical to Class Components with the exception that they will only rerender if the value of their state has changed.
export class PureComponent extends React.PureComponent<Props, State<Props>> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ...props
        };
    };

    //#region Component Lifecycle Callbacks
    componentDidMount() { };

    componentDidUpdate() { };

    componentWillUnmount() { };

    render() {
        return (
            <div className={"Component"}>
                <div>Pure Component</div>
                <div>Props: {this.props.value}</div>
                <div>State: {this.state.value}</div>
            </div>
        );
    };
    //#endregion
};

export default function ComponentExamples() {
    return (
        <div className={"Solution"}>
            <h1>Components Example</h1>
            <FunctionComponent1 value={1} />
            <FunctionComponent2 value={2} />
            <ClassComponent value={3} />
            <PureComponent value={4} />
        </div>
    );
};
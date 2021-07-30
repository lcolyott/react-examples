import React from "react"

// SOLUTION FOR COMPLEX INPUT IMPLEMENTATION
// NOTICE: This is not the only way this component could be implented

// This callback function will allow other components to receive the value from this component
interface ComplexInputProps {
    onChange?: (state: ComplexInputState) => void;
};

/**
 * A type using Typescript Utility types and Union types
 * @link https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
 * @link https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
 * 
 * This type is specifying that its keys will be of the same value as an HTMLInputElement, but we are only choosing "checked", and "value"
 */
export type ComplexInputState = Pick<HTMLInputElement, "checked" | "value">;

class ComplexInputS extends React.PureComponent<ComplexInputProps, ComplexInputState> {
    constructor(props: ComplexInputProps) {
        super(props);
        this.state = {
            checked: false,
            value: "",
        };

        // Bind our methods to this instance of our class to gain access to state
        this.onChange = this.onChange.bind(this);
        this.clear = this.clear.bind(this);
    };

    /* 
        Whenever one of our input elements has its onChange called, we send the event to this function 
        Because I have named all inputs as a key of our state, and all keys in our state are also keys of HTMLInputElement,
        we can get the specific input element's value implicitly.

        In this case, our input named "value", will implicitly grab "event.target.value". Our input named "checked", will implicitly get "event.target.checked".
    */
    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        let newState = {
            /* 
                Since event.target.name is going to be a key of our state, we use the bracket notation to use it as a key in this new object.
                Seeing as event.target.name is ALSO a key of HTMLInputElement, we can get this input's correct value
            */
            [event.target.name]: event.target[event.target.name as keyof HTMLInputElement],
        };

        // Since we are using dynamic keys, we need to specify that this object is the same type as our state
        this.setState(newState as ComplexInputState);
    };

    // Clears state values
    clear() {
        this.setState({
            checked: false,
            value: ""
        });
    };

    //#region Component Lifecycle Callbacks

    // ComponentDidUpdate is called AFTER the state of our component has changed
    componentDidUpdate() {
        // After our state has been updated with new values, send the state through the onChange callback defined in our props
        // The '?.' operator is an implicit null check to see if the function exists in the first place
        this.props.onChange?.(this.state);
    };

    /* 
        I've specifically given our inputs name attributes that match a key with our state
        Because of this, I can use a single function to handle all inputs' 'onChange' by referencing its specific key by name in our state
    */
    render() {
        return (
            <div>
                <input
                    name={"checked" as keyof ComplexInputState}
                    type={"checkbox"}
                    checked={this.state.checked}
                    onChange={this.onChange}
                />
                <input
                    name={"value" as keyof ComplexInputState}
                    type={"text"}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <button onClick={this.clear}>
                    Clear
                </button>
            </div>
        );
    }
    //#endregion
};

export default ComplexInputS;
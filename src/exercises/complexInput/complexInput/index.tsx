import React from "react";

interface ComplexInputProps {
    onChange?: (state: ComplexInputState) => void;
};

export interface ComplexInputState {
    isChecked: boolean;
    text: string;
};

class ComplexInput extends React.PureComponent<ComplexInputProps, ComplexInputState> {
    constructor(props: ComplexInputProps) {
        super(props);
        this.state = {
            isChecked: false,
            text: ""
        }
    };

    //#region Component Lifecycle Callbacks

    // Called after the component is mounted to the DOM
    componentDidMount() {
        this.props.onChange?.(this.state);
    };

    // Called after this component's state has been updated
    componentDidUpdate() {
        // From props passed by App.tsx
        this.props.onChange?.(this.state);
    };

    // Called before this component is unmounted from the DOM
    componentWillUnmount() {

    };

    // Renders this component to the DOM
    render() {
        return (
            <div>
                <input
                    type="checkbox"
                    checked={(this.state.isChecked)}
                    onChange={() => this.setState({ isChecked: !this.state.isChecked })}
                />
                <input
                    type="text"
                    value={this.state.text}
                    onChange={(event) => this.setState({ text: event.target.value })}
                />
                <button onClick={() => { this.setState({ isChecked: false, text: "" }) }}>Clear</button>
            </div>
        );
    };
    //#endregion
};

export default ComplexInput;
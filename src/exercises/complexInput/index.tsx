import React from 'react';
import ComplexInput, { ComplexInputState as CIS } from './complexInput';
import ComplexInputS, { ComplexInputState } from './complexInputS';

function ComplexInputExercise() {
    //#region ComplexInput Solution
    const [complexValue, setComplexValue] = React.useState<ComplexInputState>();

    const handleOnChange = (state: ComplexInputState) => {
        setComplexValue(state);
    };

    const renderComplexInputSolution = () => {
        return (
            <React.Fragment>
                <ComplexInputS onChange={handleOnChange} />
                {`${String(complexValue?.checked)} : ${complexValue?.value}`}
            </React.Fragment>
        );
    };
    //#endregion

    const [state, setState] = React.useState<CIS>();

    const onChange = (state: CIS) => {
        setState(state);
    };

    return (
        <div>
            {/*
          This is an element constructor
          The element has a prop of "onChange", which is equivalent to a parameter passed to a class constructor in C#
          <ComplexInput onChange={onChange} /> => new ComplexInput(onChange)
       */}
            <ComplexInput onChange={onChange} />
            {/* {renderComplexInputSolution()} */}
            <div>{String(state?.isChecked)} : {state?.text}</div>
            {renderComplexInputSolution()}
        </div>
    );
};

export default ComplexInputExercise;

import { useState, useEffect } from 'react';

function UseInputCondition() {
    const [inputConditionState, setinputConditionState] = useState();
    const [updateInputName, setupdateInputName] = useState();
    const [updateReadOnly, setupdateReadOnly] = useState();

    useEffect(() => {
        updateState(updateInputName, updateReadOnly)
    }, [updateInputName, updateReadOnly])


    function updateConditions(inputName, readOnly) {
        // do something to update the state on subsequent calls to the hook
        setupdateInputName(inputName)
        setupdateReadOnly(readOnly)
        // let style
        // if (readOnly) {
        //     style = 'bg-gray-200 focus:text-gray-700 focus:bg-gray-200 focus:border-gray-200 focus:outline-gray-200 cursor-default'
        // }
        // if (!readOnly) {
        //     style = 'bg-blue-200'
        // }
        // setinputConditionState(
        //     {
        //         ...inputConditionState,
        //         [inputName]: { readOnly: readOnly, style: style }
        //     }
        // )
        // return { inputConditionState, setinputConditionState };

    }
    const updateState = (inputName,readOnly) => {
        let style
        if (readOnly) {
            style = 'bg-gray-200 focus:text-gray-700 focus:bg-gray-200 focus:border-gray-200 focus:outline-gray-200 cursor-default'
        }
        if (!readOnly) {
            style = 'bg-blue-200'
        }
        let tempInputConditionState = {...inputConditionState,[inputName]: { readOnly: readOnly, style: style}}
        // setinputConditionState(
        //     {
        //         ...inputConditionState,
        //         [inputName]: { readOnly: readOnly, style: style }
        //     }
        // )
        setinputConditionState(tempInputConditionState)
        return { inputConditionState, setinputConditionState };
    }

    return { inputConditionState, setinputConditionState, updateConditions };
}

export default UseInputCondition
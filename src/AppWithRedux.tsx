import React, {ChangeEvent} from 'react';
import './App.css';
import Display from "./Display/Display";
import Button from "./Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {
    CloseAC, DefaultNumberDisplayChange,
    IncrementAC,
    mainStateType, MaxNumberDisplayChange,
    ResetAC,
    SetAC
} from "./state/mainDisplay-reducer";

function AppWithRedux() {

    const dispatch = useDispatch()
    const state = useSelector<AppRootState, mainStateType>(state => state.mainReducer)

    const onMaxNumberDisplayChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(MaxNumberDisplayChange(e.currentTarget.value))
    }
    const onDefaultNumberDisplayChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(DefaultNumberDisplayChange(e.currentTarget.value))
    }
    const onCloseHandler = () => {
        dispatch(CloseAC())
    }
    const setHandler = () => {
        dispatch(SetAC())
    }

    const increment = () => {
        dispatch(IncrementAC())
    }                                                                                   // функция, обслуживающая кнопку инкремент
    const reset = () => {
        dispatch(ResetAC())
    }


    return (
        <div className={"main"}>
            <div className="App">
                <span className="span"> Max number </span>
                <input id={"max-number"} type={"number"} className={state.maxNumberClassName} value={state.maxNumberDisplay} onChange={onMaxNumberDisplayChangeHandler}/>
                <span className="span"> Default number </span>
                <input type={"number"} className={state.defaultNumberClassName} value={state.defaultNumberDisplay} onChange={onDefaultNumberDisplayChangeHandler}/>

                <div className={"ButtonContainer"}>
                    <Button value={"SET"} onClick={setHandler} className={"Button"}/>
                </div>
            </div>
            { state.errorSpan && <div className="errorDiv">
                <Button value={"X"} onClick={onCloseHandler} className={"Button"}/>
                <span className="errorSpan"> Counter's max number should be bigger than default </span>
                <span className="errorSpan"> Counter's default number should not be negative </span>
            </div>}
            <div className="App">
                <Display value={state.display} className={state.displayClassName}/>
                <div className={"ButtonContainer"}>
                    <Button value={"INC"} onClick={increment} disabled={state.incDisabled} className={state.incClassName}/>
                    <Button value={"RES"} onClick={reset} disabled={state.resetDisabled} className={state.resetClassName}/>
                </div>
            </div>
        </div>

    );
}
export default AppWithRedux;
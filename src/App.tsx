import React, {ChangeEvent, useState} from 'react';
import './App.css';
import Display from "./Display/Display";
import Button from "./Button/Button";

function App() {
    //************************************************** СТЭЙТ И ФУНКЦИИ ОСНОВНОГО СЧЕТЧИКА ***************************************************************************
    let [maxNumber, setMaxNumber] = useState<number>()
    let [display, setDisplay] = useState(Number(sessionStorage.getItem("defaultNumberDisplay")))                                                               // отображение чисел на дисплее основного счетчика
    let [incDisabled, setIncDisabled] = useState<boolean>(false)                                           // делает кнопку инкремент недоступной
    let [resetDisabled, setResetDisabled] = useState<boolean>(true)                                        // делает кнопку ресет недоступной
    let [incClassName, setIncClassName] = useState<"Button"|"ButtonDisabled">("ButtonDisabled")            // меняем классы инкремента
    let [resetClassName, setResetClassName] = useState<"Button"|"ButtonDisabled">("ButtonDisabled")        // меняем классы ресета
    let [displayClassName, setDisplayClassName] = useState<"textareaStart"|"textareaEnd">("textareaStart") // меняем классы дисплея
    const increment = () => {
        setDisplay(++display)
        setResetDisabled (false)
        setResetClassName ("Button")

        if (display === maxNumber) {
            setIncDisabled(true)
            setIncClassName("ButtonDisabled")
            setDisplayClassName ("textareaEnd")
        }
    }                                                                                   // функция, обслуживающая кнопку инкремент
    const reset = () => {
        setDisplay((Number(defaultNumberDisplay)))
        setResetDisabled (true)
        setResetClassName ("ButtonDisabled")
        setIncDisabled(false)
        setIncClassName("Button")
        setDisplayClassName("textareaStart")
    }                                                                                       // функция, обслуживающая кнопку ресет

    //*************************************************** СТЭЙТ И ФУНКЦИИ УСТАНОВОЧНОГО БЛОКА *************************************************************************

    let [maxNumberDisplay, setMaxNumberDisplay] = useState<number>(Number(sessionStorage.getItem("maxNumberDisplay")))                 //отвечает за отображение данных на табло с максимальным числом
    let [defaultNumberDisplay, setDefaultNumberDisplay] = useState<number>(Number(sessionStorage.getItem("defaultNumberDisplay")))     //отвечает за отображение данных на табло с начальным числом
    let [maxNumberClassName, setMaxNumberClassName] = useState<"inputNumber"|"inputNumberError">("inputNumber")                 // классы
    let [defaultNumberClassName, setDefaultNumberClassName] = useState<"inputNumber"|"inputNumberError">("inputNumber")         // классы
    let [errorSpan, setErrorSpan] = useState(false)                                                                             // стэйт с ошибкой
    const onMaxNumberDisplayChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxNumberDisplay(Number(e.currentTarget.value))
        setErrorSpan (false)
        setMaxNumberClassName("inputNumber")
        setDefaultNumberClassName("inputNumber")
        setIncDisabled(false)
    }
    const onDefaultNumberDisplayChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDefaultNumberDisplay(Number(e.currentTarget.value))
        setErrorSpan (false)
        setMaxNumberClassName("inputNumber")
        setDefaultNumberClassName("inputNumber")
        setIncDisabled(false)
    }
    const onCloseHandler = () => {
        setErrorSpan(false)
        setMaxNumberDisplay(1)
        setDefaultNumberDisplay(0)
        setMaxNumberClassName("inputNumber")
        setDefaultNumberClassName("inputNumber")
        setDisplay(0)
        setIncDisabled(true)
        setIncClassName("ButtonDisabled")
        setResetDisabled(true)
        setResetClassName("ButtonDisabled")
    }
    const setHandler = () => {
        if (defaultNumberDisplay >= 0 && maxNumberDisplay>defaultNumberDisplay) {                       // проверяем на условие об ошибке
            setMaxNumberClassName("inputNumber")
            setDefaultNumberClassName("inputNumber")
            setMaxNumber(maxNumberDisplay)
            setDisplay (defaultNumberDisplay)                                                             //  устанавливаем значение основного дисплея справа
            setIncClassName("Button")                                                               //  делаем активной кнопку инкремента
            setIncDisabled (false)                                                                  //  делаем активной кнопку инкремента
            sessionStorage.setItem("maxNumberDisplay", JSON.stringify(maxNumberDisplay))                      // записываем оба значения в локал сторэдж
            sessionStorage.setItem("defaultNumberDisplay", JSON.stringify(defaultNumberDisplay))              // записываем оба значения в локал сторэдж
        } else {
            setMaxNumberClassName("inputNumberError")
            setDefaultNumberClassName("inputNumberError")
            setErrorSpan(true)
            setIncClassName("ButtonDisabled")
            setIncDisabled (true)
        }
    }

    
    return (
        <div className={"main"}>
            <div className="App">
                <span className="span"> Max number </span>
                <input id={"max-number"} type={"number"} className={maxNumberClassName} value={maxNumberDisplay} onChange={onMaxNumberDisplayChangeHandler}/>
                <span className="span"> Default number </span>
                <input type={"number"} className={defaultNumberClassName} value={defaultNumberDisplay} onChange={onDefaultNumberDisplayChangeHandler}/>

                <div className={"ButtonContainer"}>
                    <Button value={"SET"} onClick={setHandler} className={"Button"}/>
                </div>
            </div>
            { errorSpan && <div className="errorDiv">
                <Button value={"X"} onClick={onCloseHandler} className={"Button"}/>
                <span className="errorSpan"> Counter's max number should be bigger than default </span>
                <span className="errorSpan"> Counter's default number should not be negative </span>
            </div>}
            <div className="App">
                <Display value={display} className={displayClassName}/>
                <div className={"ButtonContainer"}>
                    <Button value={"INC"} onClick={increment} disabled={incDisabled} className={incClassName}/>
                    <Button value={"RES"} onClick={reset} disabled={resetDisabled} className={resetClassName}/>
                </div>
            </div>
        </div>

    );
}
export default App;
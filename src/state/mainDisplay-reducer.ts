export type IncrementActionType = {
    type: "INCREMENT",
}
export type ResetActionType = {
    type: "RESET"
}
export type MaxNumberDisplayChangeActionType = {
    type: "MAX-NUMBER-DISPLAY-CHANGE",
    value: number
}
export type DefaultNumberDisplayChangeActionType = {
    type: "DEFAULT-NUMBER-DISPLAY-CHANGE",
    value: number
}
export type CloseActionType = {
    type: "CLOSE"
}
export type SetActionType = {
    type: "SET"
}

export type mainStateType = {
    display: number,
    incDisabled: boolean,
    resetDisabled: boolean,
    incClassName: "Button" | "ButtonDisabled",
    resetClassName: "Button" | "ButtonDisabled",
    displayClassName: "textareaStart" | "textareaEnd",
    //-----------------------------------------------------------------------
    maxNumberDisplay: number,
    defaultNumberDisplay: number,
    maxNumberClassName: "inputNumber" | "inputNumberError",
    defaultNumberClassName: "inputNumber" | "inputNumberError",
    errorSpan: boolean
}

let initialState: mainStateType = {
    display: Number(sessionStorage.getItem("defaultNumberDisplay")),
    incDisabled: true,
    resetDisabled: true,
    incClassName: "ButtonDisabled",
    resetClassName: "ButtonDisabled",
    displayClassName: "textareaStart",
    maxNumberDisplay: Number(sessionStorage.getItem("maxNumberDisplay")),
    defaultNumberDisplay: Number(sessionStorage.getItem("defaultNumberDisplay")),
    maxNumberClassName: "inputNumber",
    defaultNumberClassName: "inputNumber",
    errorSpan: false,
}

type ActionType = IncrementActionType | ResetActionType | MaxNumberDisplayChangeActionType
    | DefaultNumberDisplayChangeActionType | CloseActionType | SetActionType

export const mainReducer = (state: mainStateType = initialState, action: ActionType): mainStateType => {
    let stateCopy = {...state}
    switch (action.type) {
        case "INCREMENT":
            stateCopy.display = stateCopy.display + 1
            stateCopy.resetDisabled = false
            stateCopy.resetClassName = "Button"
            if (stateCopy.display === stateCopy.maxNumberDisplay) {
                stateCopy.incDisabled = true;
                stateCopy.incClassName = "ButtonDisabled"
                stateCopy.displayClassName = "textareaEnd"
            }
            return stateCopy;
        case "RESET":
            return {
                ...state,
                display: (Number(state.defaultNumberDisplay)),
                resetDisabled: true,
                resetClassName: "ButtonDisabled",
                incDisabled: false,
                incClassName: "Button",
                displayClassName: "textareaStart"
            }
        case "MAX-NUMBER-DISPLAY-CHANGE":
            return {
                ...state,
                maxNumberDisplay: action.value,
                errorSpan: false,
                maxNumberClassName: "inputNumber",
                defaultNumberClassName: "inputNumber",
                incDisabled: false
            }
        case "DEFAULT-NUMBER-DISPLAY-CHANGE":
            return {
                ...state,
                defaultNumberDisplay: action.value,
                errorSpan: false,
                maxNumberClassName: "inputNumber",
                defaultNumberClassName: "inputNumber",
                incDisabled: false
            }
        case "CLOSE":
            return {
                ...state,
                errorSpan: false,
                maxNumberDisplay: 0,
                defaultNumberDisplay: 0,
                maxNumberClassName: "inputNumber",
                defaultNumberClassName: "inputNumber",
                display: 0,
                incDisabled: true,
                incClassName: "ButtonDisabled",
                resetDisabled: true,
                resetClassName: "ButtonDisabled"
            }
        case "SET":
            if (stateCopy.defaultNumberDisplay >= 0 && stateCopy.maxNumberDisplay > stateCopy.defaultNumberDisplay) {                       // проверяем на условие об ошибке
                stateCopy.maxNumberClassName = "inputNumber"
                stateCopy.defaultNumberClassName = "inputNumber"
                stateCopy.display = stateCopy.defaultNumberDisplay                                                        //  устанавливаем значение основного дисплея справа
                stateCopy.incClassName = "Button"                                                              //  делаем активной кнопку инкремента
                stateCopy.incDisabled = false                                                                  //  делаем активной кнопку инкремента
                sessionStorage.setItem("maxNumberDisplay", JSON.stringify(stateCopy.maxNumberDisplay))                      // записываем оба значения в локал сторэдж
                sessionStorage.setItem("defaultNumberDisplay", JSON.stringify(stateCopy.defaultNumberDisplay))              // записываем оба значения в локал сторэдж
            } else {
                stateCopy.maxNumberClassName = "inputNumberError"
                stateCopy.defaultNumberClassName = "inputNumberError"
                stateCopy.errorSpan = true
                stateCopy.incClassName = "ButtonDisabled"
                stateCopy.incDisabled = true
            }
            return stateCopy;
        default:
            return state
    }
}

export const IncrementAC = (): IncrementActionType => {
    return {type: "INCREMENT"}
}
export const ResetAC = (): ResetActionType => {
    return {type: "RESET"}
}
export const MaxNumberDisplayChange = (value: string) => {
    return (dispatch: any) => {
        dispatch({type: "MAX-NUMBER-DISPLAY-CHANGE", value: Number(value)})
    }
}
export const DefaultNumberDisplayChange = (value: string) => {
    return (dispatch: any) => {
        dispatch({type: "DEFAULT-NUMBER-DISPLAY-CHANGE", value: Number(value)})
    }
}

export const CloseAC = (): CloseActionType => {
    return {type: "CLOSE"}
}
export const SetAC = (): SetActionType => {
    return {type: "SET"}
}

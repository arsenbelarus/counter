import {combineReducers, applyMiddleware, createStore, Store} from "redux";
import thunkMiddleware from "redux-thunk"
import {mainReducer} from "./mainDisplay-reducer";


let reducers = combineReducers({mainReducer})

export type AppRootState = ReturnType<typeof reducers>

let store: Store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store
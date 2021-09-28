import {combineReducers, createStore, applyMiddleware} from 'redux';
import {taskReducer} from './tasks-reducer';
import {todolistReducer} from './todolist-reducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store.getState()

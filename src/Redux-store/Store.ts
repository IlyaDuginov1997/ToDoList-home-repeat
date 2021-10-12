import {combineReducers, createStore, applyMiddleware} from 'redux';
import {taskReducer} from './TaskReducer/tasks-reducer';
import {todolistReducer} from './TodolistReducer/todolist-reducer';
import {appReducer} from './AppReducer/app-reducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store.getState()

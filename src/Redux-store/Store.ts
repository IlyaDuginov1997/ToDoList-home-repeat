import {combineReducers, createStore, applyMiddleware} from 'redux';
import {taskReducer} from './TaskReducer/tasks-reducer';
import {todolistReducer} from './TodolistReducer/todolist-reducer';
import {appReducer} from './AppReducer/app-reducer';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './AuthReducer/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer,
});

// native Redux
// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
    }
);
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store.getState();

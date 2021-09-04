import {combineReducers, createStore} from 'redux';
import {taskReducer} from './tasks-reducer';
import {todolistReducer} from './todolist-reducer';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
})

export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store.getState()

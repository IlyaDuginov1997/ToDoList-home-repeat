import {v1} from 'uuid';
import {TodolistType} from '../API/todolists-api';
import {FilterType} from '../AppWithRedux';

export type AllTodolistTypes = AddTodolistType | RemoveTodolistType | ChangeTitleTodolistType | ChangeFilterTodolistType

export type TodolistDomainType = TodolistType & {
    filter: FilterType

}

export type AddTodolistType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}

export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string,
}

export type ChangeTitleTodolistType = {
    type: 'CHANGE-TITLE-TODOLIST',
    todolistId: string,
    title: string,
}

export type ChangeFilterTodolistType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: string,
    filter: FilterType,
}

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: AllTodolistTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {
                id: action.todolistId, title: action.title, filter: 'All', addedDate: '', order: 0,
            }
            return [...state, newTodolist]
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id !== action.todolistId)
        case 'CHANGE-TITLE-TODOLIST':
            return state.map((tl) => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

export const addTodolistAC = (title: string): AddTodolistType => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId: v1(),
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistType => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId,
    }
}

export const changeTitleTodolistAC = (title: string, todolistId: string): ChangeTitleTodolistType => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        todolistId,
        title,
    }
}

export const changeFilterTodolistAC = (filter: FilterType, todolistId: string): ChangeFilterTodolistType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        filter,
    }
}
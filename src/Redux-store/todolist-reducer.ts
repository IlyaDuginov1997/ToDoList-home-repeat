import {FilterType, TodolistType} from '../App';
import {v1} from 'uuid';

export type allTodolistTypes = addTodolistType | removeTodolistType | changeTitleTodolistType | changeFilterTodolistType


export type addTodolistType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}

export type removeTodolistType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string,
}

export type changeTitleTodolistType = {
    type: 'CHANGE-TITLE-TODOLIST',
    todolistId: string,
    title: string,
}

export type changeFilterTodolistType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: string,
    filter: FilterType,
}

export const todolistReducer = (state: TodolistType[], action: allTodolistTypes): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            let newTodolist: TodolistType = {
                id: action.todolistId, title: action.title, filter: 'All'
            }
            return [...state, newTodolist]
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id !== action.todolistId)
        case 'CHANGE-TITLE-TODOLIST':
            return state.map((tl) => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        default:
            throw new Error('I do not now this type')
    }
}

export const addTodolistTypeAC = (title: string): addTodolistType => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId: v1(),
    }
}

export const removeTodolistTypeAC = (todolistId: string): removeTodolistType => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId,
    }
}

export const changeTitleTodolistTypeAC = (todolistId: string, title: string): changeTitleTodolistType => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        todolistId,
        title,
    }
}

export const changeFilterTodolistTypeAC = (todolistId: string, filter: FilterType): changeFilterTodolistType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        filter,
    }
}
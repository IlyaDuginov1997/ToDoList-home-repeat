import {FilterType, TodolistType} from '../App';
import {v1} from 'uuid';

export type allTodolistTypes = addTodolistType | removeTodolistType | changeTitleTodolistType | changeFilterTodolistType


export type addTodolistType = {
    type: 'ADD-TODOLIST',
    title: string,
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
    type: 'CHANGE-FILTER-TODOLIST',
    todolistId: string,
    filter: FilterType,
}

export const todolistReducer = (state: TodolistType[], action: allTodolistTypes): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const todolistId = v1()
            let newTodolist: TodolistType = {
                id: todolistId, title: action.title, filter: 'All'
            }
            return [...state, newTodolist]
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id !== action.todolistId)
        case 'CHANGE-TITLE-TODOLIST':
            return state.map((tl) => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-FILTER-TODOLIST':
            return state.map((tl) => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        default:
            throw new Error('I do not now this type')
    }
}

export const addTodolistTypeAC = (title: string): addTodolistType => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
    }
}

export const removeTodolistTypeAC = (todolistId: string): removeTodolistType => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId
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
        type: 'CHANGE-FILTER-TODOLIST',
        todolistId,
        filter,
    }
}
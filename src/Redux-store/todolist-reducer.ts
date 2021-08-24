import {TodolistType} from '../App';
import {v1} from 'uuid';

export type addTodolistType = {
    type: 'ADD-TODOLIST',
    title: string
}

export const todolistReducer = (state: TodolistType[], action: addTodolistType): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            const todolistId = v1()
            let newTodolist: TodolistType = {
                id: todolistId, title: action.title, filter: 'All'
            }
            return [...state, newTodolist]
        default:
            throw new Error('I do not now this type')
    }
}

export const addTodolistTypeAC = (title: string ): addTodolistType => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
    }
}
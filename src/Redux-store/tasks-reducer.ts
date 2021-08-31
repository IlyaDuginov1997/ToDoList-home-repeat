import {FilterType, TasksType, TaskType, TodolistType} from '../App';
import {v1} from 'uuid';

export type allTasksTypes = addTaskType | removeTaskType


export type addTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type removeTaskType = {
    type: 'REMOVE-TASK'
    todolistId: string
}


export const taskReducer = (state: TasksType, action: allTasksTypes): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                isDone: false,
                title: action.title,
            }
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], newTask]}

        default:
            throw new Error('I do not now this type')
    }
}

export const addTaskTypeAC = (title: string, todolistId: string): addTaskType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId,
    }
}
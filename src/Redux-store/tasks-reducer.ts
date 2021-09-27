import {v1} from 'uuid';
import {AddTodolistType, RemoveTodolistType} from './todolist-reducer';
import {TasksType} from '../AppWithRedux';
import {TaskPriorities, TaskStatuses, TaskType} from '../API/todolists-api';

export type AllTasksTypes = AddTaskType
    | RemoveTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | AddTodolistType
    | RemoveTodolistType


export type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    status: TaskStatuses
}

const initialState: TasksType = {}

export const taskReducer = (state: TasksType = initialState, action: AllTasksTypes): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(), status: TaskStatuses.New, title: action.title, addedDate: '', order: 0, deadline: '',
                description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: action.todolistId

            }
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], newTask]
            }

        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(taskId => taskId.id !== action.taskId)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id !== action.taskId ? t : {
                    ...t,
                    title: action.title
                })
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id !== action.taskId ? t : {
                    ...t,
                    status: action.status
                })
            }

        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }

        case 'REMOVE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy

        default:
            return state
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId,
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId,
    }
}

export const changeTaskTitleAC = (title: string, todolistId: string, taskId: string): ChangeTaskTitleType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        todolistId,
        title
    }
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string, ): ChangeTaskStatusType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        todolistId,
        status,
    }
}




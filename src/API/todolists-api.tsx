import React from 'react'
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e5b738f6-4744-4b59-9452-509c57fc296b'
    },
})

export type GetTodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type CommonTodolistType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

export type ItemType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    totalCount?: number
}

export type UpdatedPropertiesType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type GetTodolistTasksType = {
    items: ItemType[]
    totalCount: number
    error: string
}

export type CreateTodolistTasksType = {
    data: ItemType
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<GetTodolistsType>('todo-lists')
            .then(res => {
                return res.data
            })
    },

    createTodolist(title: string) {
        return instance.post<CommonTodolistType<{ item: GetTodolistsType }>>('todo-lists/', {title})
            .then(res => {
                return res.data
            })
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<CommonTodolistType>(`todo-lists/${todolistId}`)
            .then(res => {
                return res.data
            })
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonTodolistType>(`todo-lists/${todolistId}`, {title})
            .then(res => {
                return res.data
            })
    },

    getTodolistTasks(todolistId: string) {
        return instance.get<GetTodolistTasksType>(`todo-lists/${todolistId}/tasks`)
            .then(res => {
                return res.data
            })
    },

    createTodolistTask(todolistId: string, title: string) {
        return instance.post<CreateTodolistTasksType>(`todo-lists/${todolistId}/tasks`, {title: title})
            .then(res => {
                return res.data
            })
    },

    updateTodolistTask(todolistId: string, taskId: string, model: UpdatedPropertiesType) {
        return instance.put<CommonTodolistType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
            .then(res => {
                return res.data
            })
    },

    deleteTodolistTask(todolistId: string, taskId: string) {
        return instance.delete<CommonTodolistType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => {
                return res.data
            })
    },
}


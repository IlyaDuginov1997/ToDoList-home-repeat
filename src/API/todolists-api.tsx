import React from 'react'
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e5b738f6-4744-4b59-9452-509c57fc296b'
    },
})

export type getTodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type commonTodolistType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<getTodolistsType>('todo-lists')
            .then(res => {
                return res.data
            })
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<commonTodolistType>(`todo-lists/${todolistId}`)
            .then(res => {
                return res.data
            })
    },

    createTodolist(title: string) {
        return instance.post<commonTodolistType<{ item: getTodolistsType }>>('todo-lists/', {title})
            .then(res => {
                return res.data
            })
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<commonTodolistType>(`todo-lists/${todolistId}`, {title})
            .then(res => {
                return res.data
            })
    },
}


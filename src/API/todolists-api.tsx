import React from 'react'
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e5b738f6-4744-4b59-9452-509c57fc296b'
    },
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get('todo-lists')
            .then(res => {
                return res.data
            })
    },

    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
            .then(res => {
                return res.data
            })
    },

    createTodolist(title: string) {
        return instance.post('todo-lists/', {title})
            .then(res => {
                return res.data
            })
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title})
            .then(res => {
                return res.data
            })
    },
}


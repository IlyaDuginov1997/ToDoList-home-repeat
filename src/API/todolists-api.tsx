import React from 'react';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e5b738f6-4744-4b59-9452-509c57fc296b'
    },
});

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}


export type TodolistType = {
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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdatedPropertiesType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type TasksType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type CreateTodolistTasksType<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
            .then(res => {
                return res.data;
            });
    },

    createTodolist(title: string) {
        return instance.post<CommonTodolistType<{ item: TodolistType }>>('todo-lists/', {title})
            .then(res => {
                return res.data;
            });
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<CommonTodolistType>(`todo-lists/${todolistId}`)
            .then(res => {
                return res.data;
            });
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonTodolistType>(`todo-lists/${todolistId}`, {title})
            .then(res => {
                return res.data;
            });
    },

    getTodolistTasks(todolistId: string) {
        return instance.get<TasksType>(`todo-lists/${todolistId}/tasks`)
            .then(res => {
                return res.data;
            });
    },

    createTodolistTask(todolistId: string, title: string) {
        return instance.post<CreateTodolistTasksType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: title})
            .then(res => {
                return res.data;
            });
    },

    updateTodolistTask(todolistId: string, taskId: string, model: UpdatedPropertiesType) {
        return instance.put<CommonTodolistType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
            .then(res => {
                return res.data;
            });
    },

    deleteTodolistTask(todolistId: string, taskId: string) {
        return instance.delete<CommonTodolistType>(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => {
                return res.data;
            });
    },
};

export const loginAPI = {
    login(loginParams: LoginParamsType) {
        return instance.post<CommonTodolistType<{ userId?: number }>>('auth/login', loginParams)
            .then(res => {
                return res.data;
            });
    },
    logout() {
        return instance.delete<CommonTodolistType>('auth/login')
            .then(res => {
                return res.data;
            });
    },
    me() {
        return instance.get<CommonTodolistType<{id: number, email: string, login: string}>>('auth/me')
            .then(res => {
                return res.data;
            });
    }
};
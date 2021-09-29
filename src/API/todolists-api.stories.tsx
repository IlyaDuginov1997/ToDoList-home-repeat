import React, {useEffect, useState} from 'react'
import {todolistsAPI} from './todolists-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => {
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistTitle = 'APA'
    useEffect(() => {
        todolistsAPI.createTodolist(todolistTitle)
            .then(res => {
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '04a78152-f026-4c86-ace4-cc3d7ccff3a4'
    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '897fadfd-9715-48a0-bf11-5a23d83b37a8'
    const todolistTitle = 'What to listen'

    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, todolistTitle)
            .then(res => {
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '897fadfd-9715-48a0-bf11-5a23d83b37a8'
    useEffect(() => {
        todolistsAPI.getTodolistTasks(todolistId)
            .then(res => {
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '897fadfd-9715-48a0-bf11-5a23d83b37a8'
    const taskTitle = 'Green Day'
    useEffect(() => {
        todolistsAPI.createTodolistTask(todolistId, taskTitle)
            .then(res => {
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '897fadfd-9715-48a0-bf11-5a23d83b37a8'
    const taskId = '21407b60-4d68-4a06-b0da-c8a9b8e18de7'
    const newTaskTitle = 'Metallica'


    useEffect(() => {
        todolistsAPI.updateTodolistTask(todolistId, taskId, {
            title: newTaskTitle,
            deadline: '',
            description: 'description',
            priority: 0,
            status: 0,
            startDate: ''
        })
            .then(res => {
                setState(res)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'ca908554-6514-4c6b-b39b-40ee047fa8bc'
    const taskId = '5c1b5846-a272-484a-abb5-14e73a3fc5d5'
    useEffect(() => {
        todolistsAPI.deleteTodolistTask(todolistId, taskId)
            .then(res => {
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
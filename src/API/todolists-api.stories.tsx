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
    const todolistId = 'a9059091-8969-4196-9497-ff8340a5f72f'
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
    const todolistId = 'd6c31e58-4d8a-4758-bf4f-750cce3920f9'
    const todolistTitle = 'DIPA'

    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, todolistTitle)
            .then(res => {
                setState(res)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

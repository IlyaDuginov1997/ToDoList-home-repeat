import React from 'react';
import './App.css'
import {Todolist} from './Todolist';

export type TodolistType = {
    id: number
    title: string
}

export type TaskType = {
    id: number
    isDone: boolean
    title: string
}

export function App() {

    const todolist1: TodolistType[] = [
        {id: 1, title: 'What to learn'}
    ]

    const tasks1: TaskType[] = [
        {id: 1, isDone: true, title: 'HTML&CSS'},
        {id: 2, isDone: false, title: 'React'},
        {id: 3, isDone: false, title: 'Redux'},
    ]

    const todolist2: TodolistType[] = [
        {id: 1, title: 'What to buy'}
    ]

    const tasks2: TaskType[] = [
        {id: 1, isDone: true, title: 'Meat'},
        {id: 2, isDone: false, title: 'Bread'},
        {id: 3, isDone: false, title: 'Milk'},
    ]

    return (
        <div className='App'>
            <Todolist todolist={todolist1} tasks={tasks1}/>
            <Todolist todolist={todolist2} tasks={tasks2}/>
        </div>
    )
}
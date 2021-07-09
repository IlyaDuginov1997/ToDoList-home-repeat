import React, {useState} from 'react';
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

export type filterTask = 'All' | 'Active' | 'Completed'

export function App() {


    let [filter, setFilter] = useState<filterTask>('All')
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, isDone: true, title: 'HTML&CSS'},
        {id: 2, isDone: false, title: 'React'},
        {id: 3, isDone: false, title: 'Redux'},
    ])

    let copyTasks = tasks
    if (filter === 'Active') {
        copyTasks = tasks.filter( f => !f.isDone)
    }

    if (filter === 'Completed') {
        copyTasks = tasks.filter( f => f.isDone)
    }
    console.log(tasks)
    console.log(copyTasks)

    const addTask = () => {
        const newTask: TaskType = {
            id: 4,
            isDone: false,
            title: 'addSomeTask',
        }
        setTasks([...tasks, newTask])
    }

    const todolist: TodolistType[] = [
        {id: 1, title: 'What to learn'}
    ]

    return (
        <div className='App'>
            <Todolist
                title={todolist[0].title}
                tasks={copyTasks}
                setFilter={setFilter}
                addTask={addTask}/>
        </div>
    )
}
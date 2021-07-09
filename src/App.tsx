import React, {useState} from 'react';
import './App.css'
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TodolistType = {
    id: number
    title: string
}
export type TaskType = {
    id: string
    isDone: boolean
    title: string
}
export type filterTask = 'All' | 'Active' | 'Completed'



export function App() {

    let [filter, setFilter] = useState<filterTask>('All')
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), isDone: true, title: 'HTML&CSS'},
        {id: v1(), isDone: false, title: 'React'},
        {id: v1(), isDone: false, title: 'Redux'},
    ])


        let copyTasks = tasks
        if (filter === 'Active') {
            copyTasks = tasks.filter( f => !f.isDone)
        }

        if (filter === 'Completed') {
            copyTasks = tasks.filter( f => f.isDone)
        }


    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            isDone: false,
            title: title,
        }
        setTasks([...tasks, newTask])
    }
    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter( t => t.id !== taskId)
        setTasks(filteredTasks)
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
                removeTask={removeTask}

                addTask={addTask}/>
        </div>
    )
}
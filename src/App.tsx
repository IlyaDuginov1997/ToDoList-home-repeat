import React, {useState} from 'react';
import './App.css'
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TodolistType = {
    id: string
    title: string
    filter: FilterTask
}
export type TaskType = {
    id: string
    isDone: boolean
    title: string
}
export type FilterTask = 'All' | 'Active' | 'Completed'


export function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState(
        {
            [todolistId1]: [
                {id: v1(), isDone: true, title: 'HTML&CSS'},
                {id: v1(), isDone: false, title: 'React'},
                {id: v1(), isDone: false, title: 'Redux'},
            ],
            [todolistId2]: [
                {id: v1(), isDone: true, title: 'Meat'},
                {id: v1(), isDone: false, title: 'Bread'},
                {id: v1(), isDone: false, title: 'Milk'},
            ],
        }
    )


    const addTask = (title: string, todolidtId: string) => {
        const newTask: TaskType = {
            id: v1(),
            isDone: false,
            title: title,
        }
        setTasks({...tasks, [todolidtId]: [...tasks[todolidtId], newTask] })
    }


    const removeTask = (taskId: string, todolidtId: string) => {
        const filteredTasks = tasks[todolidtId].filter(t => t.id !== taskId)
        setTasks({...tasks, [todolidtId]: filteredTasks })
    }

    const changeStatus = (taskId: string, isDone: boolean, todolidtId: string) => {
        const newTasks = tasks[todolidtId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        setTasks({...tasks, [todolidtId]: newTasks})
    }

    let changeFilter = (filter: FilterTask, todolistID: string) => {
        let newTodolists = todolists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl)
        setTodolists(newTodolists)
    }

    return (
        <div className='App'>
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id]
                let copyTasks = allTodolistTasks
                if (tl.filter === 'Active') {
                    copyTasks = allTodolistTasks.filter(f => !f.isDone)
                }

                if (tl.filter === 'Completed') {
                    copyTasks = allTodolistTasks.filter(f => f.isDone)
                }

                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={copyTasks}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        changeFilter={changeFilter}
                        addTask={addTask}/>
                )
            })}
        </div>
    )
}
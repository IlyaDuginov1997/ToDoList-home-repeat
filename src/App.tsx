import React, {useState} from 'react';
import './App.css'
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

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

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            isDone: false,
            title: title,
        }
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }


    const removeTask = (taskId: string, todolistId: string) => {
        const filteredTasks = tasks[todolistId].filter(t => t.id !== taskId)
        setTasks({...tasks, [todolistId]: filteredTasks})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const newTasks = tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        setTasks({...tasks, [todolistId]: newTasks})
    }

    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        setTasks({
            ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taskId
                ? {...t, title: title}
                : t)
            ]
        })
    }

    const addNewTodolist = (title: string) => {
        const todolistId = v1()
        let newTodolist: TodolistType = {
            id: todolistId, title: title, filter: 'All'
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }

    let changeTodolistFilter = (filter: FilterTask, todolistId: string) => {
        let newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl)
        setTodolists(newTodolists)
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(t => t.id === todolistId
            ? {...t, title: title}
            : t))
    }

    console.log(tasks)

    return (
        <div className='App'>
            <AddItemForm addItem={addNewTodolist}/>
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
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}/>
                )
            })}
        </div>
    )
}
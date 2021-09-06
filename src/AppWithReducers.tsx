import React, {useReducer, useState} from 'react';
import './App.css'
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistReducer
} from './Redux-store/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from './Redux-store/tasks-reducer';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type FilterType = 'All' | 'Active' | 'Completed'


export function AppWithReducers() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, dispatchToTasks] = useReducer(taskReducer, {
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
        dispatchToTasks(addTaskAC(title, todolistId))
    }


    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todolistId))
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistId))

    }

    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        dispatchToTasks(changeTaskTitleAC(title, todolistId, taskId))

    }

    const addNewTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }

    const removeTodolist = (todolistId: string) => {
        dispatchToTasks(removeTodolistAC(todolistId))
        dispatchToTodolists(removeTodolistAC(todolistId))
    }

    let changeTodolistFilter = (filter: FilterType, todolistId: string) => {
        dispatchToTodolists(changeFilterTodolistAC(filter, todolistId))

    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatchToTodolists(changeTitleTodolistAC(title, todolistId))
    }

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
                        changeTaskStatus={changeStatus}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}/>
                )
            })}
        </div>
    )
}
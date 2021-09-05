import React, {useCallback} from 'react';
import './App.css'
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC
} from './Redux-store/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './Redux-store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './Redux-store/Store';

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


export function AppWithRedux() {
    console.log('App is called')

    let todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks)
    const dispatch = useDispatch()

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))

    }, [])

    const changeTaskTitle = useCallback((title: string, todolistId: string, taskId: string) => {
        dispatch(changeTaskTitleAC(title, todolistId, taskId))

    }, [])

    const addNewTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [])

    const changeTodolistFilter = useCallback((filter: FilterType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(filter, todolistId))

    }, [])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTitleTodolistAC(title, todolistId))
    }, [])

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
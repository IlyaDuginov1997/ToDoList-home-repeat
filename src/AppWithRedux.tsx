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


export const AppWithRedux = () => {
    console.log('App is called')

    let todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks)
    const dispatch = useDispatch()

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))

    }, [dispatch])

    const changeTaskTitle = useCallback((title: string, todolistId: string, taskId: string) => {
        dispatch(changeTaskTitleAC(title, todolistId, taskId))

    }, [dispatch])

    const addNewTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const changeTodolistFilter = useCallback((filter: FilterType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(filter, todolistId))

    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTitleTodolistAC(title, todolistId))
    }, [dispatch])

    return (
        <div className='App'>
            <AddItemForm addItem={addNewTodolist}/>
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id]

                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={allTodolistTasks}
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
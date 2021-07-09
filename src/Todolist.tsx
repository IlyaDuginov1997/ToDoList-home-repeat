import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterTask, TaskType} from './App';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    setFilter: (filter: filterTask) => void
}


export function Todolist(props: TodolistPropsType) {

    let [title, setTitle] = useState('')

    const JSXTasks = props.tasks.map( t => {
        const removeTask = () => {
            props.removeTask(t.id)
        }
        return(
            <li key={t.id}>
                <input
                    type='checkbox'
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    } )

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.setFilter('All')
    }

    const onActiveClickHandler = () => {
        props.setFilter('Active')
    }

    const onComplitedClickHandler = () => {
        props.setFilter('Completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onKeyPress={onKeyPressHandler}
                    onChange={changeHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {JSXTasks}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onComplitedClickHandler}>Completed</button>

            </div>
        </div>
    )
}
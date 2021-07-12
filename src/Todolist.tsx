import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterTask, TaskType} from './App';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterTask
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeFilter: (filter: FilterTask, todolistId: string) => void
}


export function Todolist(props: TodolistPropsType) {
    console.log('Todolist rendering')

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const JSXTasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.todolistId)
        }

        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.todolistId)
        }
        return (
            <li
                key={t.id}
                className={t.isDone ? 'is-done' : ''}>
                <input
                    type='checkbox'
                    checked={t.isDone}
                    onChange={changeStatus}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title, props.todolistId)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }


    const onAllClickHandler = () => {
        props.changeFilter('All', props.todolistId)
    }

    const onActiveClickHandler = () => {
        props.changeFilter('Active', props.todolistId)
    }

    const onComplitedClickHandler = () => {
        props.changeFilter('Completed', props.todolistId)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onKeyPress={onKeyPressHandler}
                    onChange={changeHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>Title is required</div>}

            </div>
            <ul>
                {JSXTasks}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={onComplitedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}
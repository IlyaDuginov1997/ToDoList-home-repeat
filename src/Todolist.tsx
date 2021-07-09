import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterTask, TaskType} from './App';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: filterTask
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    setFilter: (filter: filterTask) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}


export function Todolist(props: TodolistPropsType) {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const JSXTasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id)
        }

        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked)
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
            props.addTask(title)
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
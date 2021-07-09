import React from 'react';
import {filterTask, TaskType} from './App';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    addTask: () => void
    setFilter: (filter: filterTask) => void
}


export function Todolist(props: TodolistPropsType) {

    const JSXTasks = props.tasks.map( t => {
        return(
            <li key={t.id}>
                <input
                    type='checkbox'
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button>x</button>
            </li>
        )
    } )

    const addTask = () => {
        props.addTask()
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {JSXTasks}
            </ul>
            <div>
                <button onClick={() => props.setFilter('All')}>All</button>
                <button onClick={() => props.setFilter('Active')}>Active</button>
                <button onClick={() => props.setFilter('Completed')}>Completed</button>

            </div>
        </div>
    )
}
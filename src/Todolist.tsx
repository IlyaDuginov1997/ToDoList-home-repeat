import React, {ChangeEvent} from 'react';
import {FilterTask, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterTask
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeFilter: (filter: FilterTask, todolistId: string) => void
    changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}


export function Todolist(props: TodolistPropsType) {

    const JSXTasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.todolistId)
        }

        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.todolistId)
        }

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(title, props.todolistId, t.id)
        }
        return (
            <li
                key={t.id}
                className={t.isDone ? 'is-done' : ''}>
                <input
                    type='checkbox'
                    checked={t.isDone}
                    onChange={changeStatus}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const onAllClickHandler = () => {
        props.changeFilter('All', props.todolistId)
    }

    const onActiveClickHandler = () => {
        props.changeFilter('Active', props.todolistId)
    }

    const onComplitedClickHandler = () => {
        props.changeFilter('Completed', props.todolistId)
    }

    const addTaskForTodolist = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            </h3>
            <AddItemForm addItem={addTaskForTodolist}/>
            <ul>
                {JSXTasks}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
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



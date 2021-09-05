import React, {ChangeEvent, useCallback} from 'react';
import {FilterType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTodolistFilter: (filter: FilterType, todolistId: string) => void
    changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}


export function Todolist(props: TodolistPropsType) {
    console.log('Todolist is called')

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
        props.changeTodolistFilter('All', props.todolistId)
    }

    const onActiveClickHandler = () => {
        props.changeTodolistFilter('Active', props.todolistId)
    }

    const onComplitedClickHandler = () => {
        props.changeTodolistFilter('Completed', props.todolistId)
    }

    const addTaskForTodolist = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [])

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }

    const removeTodolist = (todolistId: string) => {
        props.removeTodolist(todolistId)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={() => removeTodolist(props.todolistId)}>x</button>
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



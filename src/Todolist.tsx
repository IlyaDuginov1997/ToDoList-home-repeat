import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Task} from './Task';
import {FilterType} from './AppWithRedux';
import {TaskStatuses, TaskType} from './API/todolists-api';
import {useDispatch} from 'react-redux';
import {setTaskTC} from './Redux-store/tasks-reducer';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
    changeTodolistFilter: (filter: FilterType, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}


export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('Todolist is called')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTaskTC(props.todolistId))
    }, [])

    let copyTasks = props.tasks
    if (props.filter === 'Active') {
        copyTasks = props.tasks.filter(f => f.status === TaskStatuses.New)
    }

    if (props.filter === 'Completed') {
        copyTasks = props.tasks.filter(f => f.status === TaskStatuses.Completed)
    }
    const JSXTasks = copyTasks.map(t => <Task
        key={t.id}
        task={t}
        todolistId={props.todolistId}
        removeTask={props.removeTask}
        changeTaskStatus={props.changeTaskStatus}
        changeTaskTitle={props.changeTaskTitle}/>)

    const onAllClickHandler = useCallback(() => {
        props.changeTodolistFilter('All', props.todolistId)
    }, [props.changeTodolistFilter, props.todolistId])

    const onActiveClickHandler = useCallback(() => {
        props.changeTodolistFilter('Active', props.todolistId)
    }, [props.changeTodolistFilter, props.todolistId])

    const onComplitedClickHandler = useCallback(() => {
        props.changeTodolistFilter('Completed', props.todolistId)
    }, [props.changeTodolistFilter, props.todolistId])

    const addTaskForTodolist = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.addTask, props.todolistId])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }, [props.changeTodolistTitle, props.todolistId])

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
})


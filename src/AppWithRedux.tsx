import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistTC,
    changeFilterTodolistAC,
    changeTitleTodolistAC, changeTodolistTitleTC,
    removeTodolistTC,
    setTodolistTC,
    TodolistDomainType
} from './Redux-store/todolist-reducer';
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from './Redux-store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './Redux-store/Store';
import {TaskStatuses, TaskType} from './API/todolists-api';
import {Todolist} from './Todolist';
import {AppWithReducers} from './AppWithReducers';

// что бы после рефакторинга не падали там ошибки
const AppWithReducersComponent = AppWithReducers;

export type TasksType = {
    [key: string]: TaskType[]
}

export type FilterType = 'All' | 'Active' | 'Completed'


export const AppWithRedux = () => {
    console.log('App is called');


    let todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists);
    let tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setTodolistTC());
    }, []);


    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId));
    }, [dispatch]);

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC(taskId, todolistId));
    }, [dispatch]);

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeTaskStatusTC(taskId, status, todolistId));
    }, [dispatch]);

    const changeTaskTitle = useCallback((title: string, todolistId: string, taskId: string) => {
        dispatch(changeTaskTitleTC(title, taskId, todolistId));
    }, [dispatch]);

    const addNewTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    }, [dispatch]);

    const changeTodolistFilter = useCallback((filter: FilterType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(filter, todolistId));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        // dispatch(changeTitleTodolistAC(title, todolistId));
        dispatch(changeTodolistTitleTC(title, todolistId));
    }, [dispatch]);

    return (
        <div className="App">
            <AddItemForm addItem={addNewTodolist}/>
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id];

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
                );
            })}
        </div>
    );
};
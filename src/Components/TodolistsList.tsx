import React, {useCallback, useEffect} from 'react';
import '../App.css';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistTC,
    changeFilterTodolistAC,
    changeTodolistTitleTC,
    removeTodolistTC,
    setTodolistTC,
    TodolistDomainType
} from '../Redux-store/TodolistReducer/todolist-reducer';
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from '../Redux-store/TaskReducer/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../Redux-store/Store';
import {TaskStatuses, TaskType} from '../API/todolists-api';
import {Todolist} from './Todolist';
import {AppWithReducers} from '../Evolution-components/AppWithReducers';
import Container from '@mui/material/Container/Container';
import {Grid, Paper} from '@mui/material';
import {Redirect} from 'react-router-dom';

// что бы после рефакторинга не падали там ошибки
const AppWithReducersComponent = AppWithReducers;

export type TasksType = {
    [key: string]: TaskType[]
}

export type FilterType = 'All' | 'Active' | 'Completed'


export const TodolistsList = () => {
    console.log('TodolistsList is called');
    const dispatch = useDispatch();

    let todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists);
    let tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks);

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged);

    useEffect(() => {
        if (!isLogged) {
            return
        }
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
        dispatch(changeFilterTodolistAC({filter, todolistId}));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        // dispatch(changeTitleTodolistAC(title, todolistId));
        dispatch(changeTodolistTitleTC(title, todolistId));
    }, [dispatch]);

    if (!isLogged) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addNewTodolist} disabled={false}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return (
                            <Grid item key={tl.id}>
                                <Paper
                                    elevation={3}
                                    style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        entityStatus={tl.todolistEntityStatus}
                                        tasks={allTodolistTasks}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        removeTask={removeTask}
                                        changeTaskStatus={changeStatus}
                                        changeTodolistFilter={changeTodolistFilter}
                                        addTask={addTask}/>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>

        </div>
    );
};
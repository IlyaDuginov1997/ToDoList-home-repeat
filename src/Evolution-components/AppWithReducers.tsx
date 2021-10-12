import React, {useReducer} from 'react';
import '../App.css';
import {Todolist} from '../Components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from '../Components/AddItemForm';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistReducer
} from '../Redux-store/TodolistReducer/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from '../Redux-store/TaskReducer/tasks-reducer';
import {TaskPriorities, TaskStatuses} from '../API/todolists-api';
import {FilterType} from '../Components/TodolistsList';


export function AppWithReducers() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'All', order: 0, addedDate: '', entityStatus: 'succeeded',},
        {id: todolistId2, title: 'What to buy', filter: 'All', order: 0, addedDate: '', entityStatus: 'succeeded',},
    ]);

    let [tasks, dispatchToTasks] = useReducer(taskReducer, {
            [todolistId1]: [
                {
                    id: v1(), status: TaskStatuses.Completed, title: 'HTML&CSS', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: todolistId1
                },
                {
                    id: v1(), status: TaskStatuses.New, title: 'React', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: todolistId1
                },
                {
                    id: v1(), status: TaskStatuses.New, title: 'Redux', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: todolistId1
                },
            ],
            [todolistId2]: [
                {
                    id: v1(), status: TaskStatuses.Completed, title: 'Meat', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: todolistId1
                },
                {
                    id: v1(), status: TaskStatuses.New, title: 'Bread', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: todolistId2
                },
                {
                    id: v1(), status: TaskStatuses.New, title: 'Milk', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: todolistId2
                },
            ],
        }
    );

    const addTask = (title: string, todolistId: string) => {
        dispatchToTasks(addTaskAC({
            id: '1', status: TaskStatuses.Completed, title, addedDate: '', order: 0, deadline: '',
            description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: todolistId
        }));
    };


    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todolistId));
    };

    const changeStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, status, todolistId));

    };

    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        dispatchToTasks(changeTaskTitleAC(title, todolistId, taskId));

    };

    const addNewTodolist = (title: string) => {
        const action = addTodolistAC({id: todolistId1, title, order: 0, addedDate: '',});
        dispatchToTasks(action);
        dispatchToTodolists(action);
    };

    const removeTodolist = (todolistId: string) => {
        dispatchToTasks(removeTodolistAC(todolistId));
        dispatchToTodolists(removeTodolistAC(todolistId));
    };

    let changeTodolistFilter = (filter: FilterType, todolistId: string) => {
        dispatchToTodolists(changeFilterTodolistAC(filter, todolistId));

    };

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatchToTodolists(changeTitleTodolistAC(title, todolistId));
    };

    return (
        <div className="App">
            <AddItemForm addItem={addNewTodolist}/>
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id];
                let copyTasks = allTodolistTasks;
                if (tl.filter === 'Active') {
                    copyTasks = allTodolistTasks.filter(f => f.status === TaskStatuses.New);
                }

                if (tl.filter === 'Completed') {
                    copyTasks = allTodolistTasks.filter(f => f.status === TaskStatuses.Completed);
                }

                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        entityStatus={tl.entityStatus}
                        tasks={copyTasks}
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
}
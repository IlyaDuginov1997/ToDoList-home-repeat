import React, {useState} from 'react';
import '../App.css';
import {v1} from 'uuid';
import {AddItemForm} from '../Components/AddItemForm';
import {TaskPriorities, TaskStatuses, TaskType} from '../API/todolists-api';
import {TodolistDomainType} from '../Redux-store/TodolistReducer/todolist-reducer';
import {Todolist} from '../Components/Todolist';
import {FilterType, TasksType} from '../Components/TodolistsList';


export function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All', order: 0, addedDate: '', entityStatus: 'succeeded'},
        {id: todolistId2, title: 'What to buy', filter: 'All', order: 0, addedDate: '', entityStatus: 'succeeded'},
    ]);
    let [tasks, setTasks] = useState<TasksType>(
        {
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
        const newTask: TaskType = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            deadline: '',
            description: '',
            priority: TaskPriorities.Hi,
            startDate: '',
            todoListId: todolistId
        };
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]});
    };


    const removeTask = (taskId: string, todolistId: string) => {
        const filteredTasks = tasks[todolistId].filter(t => t.id !== taskId);
        setTasks({...tasks, [todolistId]: filteredTasks});
    };

    const changeStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        const newTasks = tasks[todolistId].map(t => t.id === taskId ? {...t, status: status} : t);
        setTasks({...tasks, [todolistId]: newTasks});
    };

    const changeTaskTitle = (title: string, todolistId: string, taskId: string) => {
        setTasks({
            ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taskId
                ? {...t, title: title}
                : t)
            ]
        });
    };

    const addNewTodolist = (title: string) => {
        const todolistId = v1();
        let newTodolist: TodolistDomainType = {
            id: todolistId, title: title, filter: 'All', addedDate: '', order: 0, entityStatus: 'succeeded',
        };
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [todolistId]: []});
    };

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId));
        const copyTasks = {...tasks};
        delete copyTasks[todolistId];
        setTasks(copyTasks);
    };

    let changeTodolistFilter = (filter: FilterType, todolistId: string) => {
        let newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl);
        setTodolists(newTodolists);
    };

    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(t => t.id === todolistId
            ? {...t, title: title}
            : t));
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
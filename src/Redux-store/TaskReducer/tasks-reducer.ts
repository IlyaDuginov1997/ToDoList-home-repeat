import {
    addTodolistAC,
    AddTodolistType, removeTodolistAC,
    RemoveTodolistType, setTodolistsAC,
    setTodolistStatus,
    SetTodolistsType
} from '../TodolistReducer/todolist-reducer';
import {TasksType} from '../../Components/TodolistsList';
import {TaskStatuses, TaskType, todolistsAPI, TodolistType} from '../../API/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../Store';
import {setAppError, setAppStatus} from '../AppReducer/app-reducer';
import {handlerServerAppError, handlerServerNetworkError} from '../../Helep-functions/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AllTasksTypes = AddTaskType
    | RemoveTaskType
    | ChangeTaskTitleType
    | ChangeTaskStatusType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistsType
    | SetTasksType

export type AddTaskType = ReturnType<typeof addTaskAC>
export type RemoveTaskType = ReturnType<typeof removeTaskAC>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type SetTasksType = ReturnType<typeof setTasksAC>


const initialState: TasksType = {};

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            const newTask: TaskType = {...action.payload.task};
            state[action.payload.task.todoListId].unshift(newTask);
            // [action.payload.task.todoListId] = [newTask, ...state[action.task.todoListId],]
        },
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        },
        changeTaskTitleAC(state, action: PayloadAction<{ title: string, todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            tasks[index].title = action.payload.title;
        },
        changeTaskStatusAC(state, action: PayloadAction<{ taskId: string, status: TaskStatuses, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            tasks[index].status = action.payload.status;
        },
        setTasksAC(state, action: PayloadAction<{ tasks: TaskType[], todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((t: TodolistType) => {
                state[t.id] = [];
            });
        });
    }
});

export const taskReducer = slice.reducer;
export const {addTaskAC, removeTaskAC, changeTaskTitleAC, changeTaskStatusAC, setTasksAC,} = slice.actions;

export const setTaskTC = (todolistId: string) => {
    return (dispatch: taskReducerThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI.getTodolistTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC({tasks: res.items, todolistId}));
                dispatch(setAppStatus({status: 'succeeded'}));
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch);
            });
    };
};

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: taskReducerThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI.deleteTodolistTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC({taskId, todolistId}));
                dispatch(setAppStatus({status: 'succeeded'}));
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch);
            });
    };
};

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: taskReducerThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI.createTodolistTask(todolistId, title)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(addTaskAC({task: res.data.item}));
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(setTodolistStatus({todolistEntityStatus: 'succeeded', todolistId}));
                } else {
                    // util helper-function
                    handlerServerAppError(res, dispatch);
                }
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch);
            });
    };
};

export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: taskReducerThunkDispatch, getState: () => AppRootStateType) => {
        const allTasks = getState().tasks;
        const task = allTasks[todolistId].find((t) => t.id === taskId);
        if (task) {
            dispatch(setAppStatus({status: 'loading'}));
            todolistsAPI.updateTodolistTask(todolistId, taskId, {
                title: task.title,
                description: task.description,
                status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            })
                .then(res => {
                    dispatch(changeTaskStatusAC({taskId, status, todolistId}));
                    dispatch(setAppStatus({status: 'succeeded'}));
                })
                .catch(err => {
                    // util helper-function
                    handlerServerNetworkError(err, dispatch);
                });
        }
    };
};

export const changeTaskTitleTC = (title: string, taskId: string, todolistId: string) => {
    return (dispatch: taskReducerThunkDispatch, getState: () => AppRootStateType) => {
        const allTasks = getState().tasks;
        const task = allTasks[todolistId];
        const ourTask = task.find((t) => {
            if (t.id === taskId) {
                return t;
            }
        });
        if (ourTask) {
            dispatch(setAppStatus({status: 'loading'}));
            todolistsAPI.updateTodolistTask(todolistId, taskId, {
                title,
                description: ourTask.description,
                status: ourTask.status,
                priority: ourTask.priority,
                startDate: ourTask.startDate,
                deadline: ourTask.deadline,
            })
                .then(res => {
                    if (res.resultCode === 0) {
                        dispatch(changeTaskTitleAC({title, todolistId, taskId}));
                        dispatch(setAppStatus({status: 'succeeded'}));
                    } else {
                        // util helper-function
                        handlerServerAppError(res, dispatch);
                    }
                })
                .catch(err => {
                    // util helper-function
                    handlerServerNetworkError(err, dispatch);
                });
        }
    };
};

export type taskReducerThunkDispatch = Dispatch<AllTasksTypes
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setTodolistStatus>>
import {
    addTodolistAC,
    AddTodolistType, removeTodolistAC,
    RemoveTodolistType, setTodolistsAC,
    setTodolistStatus,
    SetTodolistsType
} from '../TodolistReducer/todolist-reducer';
import {TasksType} from '../../Components/TodolistsList';
import {TaskStatuses, TaskType, todolistsAPI} from '../../API/todolists-api';
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

// const slice = createSlice({
//     name: 'tasks',
//     initialState: initialState,
//     reducers: {
//         addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
//             const newTask: TaskType = {...action.payload.task};
//
//             [action.payload.task.todoListId] = [newTask, ...state[action.payload.task.todoListId]];
//         }
//     }
// });

// export const taskReducer = slice.reducer;

export const taskReducer = (state: TasksType = initialState, action: any): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask: TaskType = {...action.task};
            return {
                ...state,
                [action.task.todoListId]: [newTask, ...state[action.task.todoListId],]
            };

        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(taskId => taskId.id !== action.taskId)
            };

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id !== action.taskId ? t : {
                    ...t,
                    title: action.title
                })
            };

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id !== action.taskId ? t : {
                    ...t,
                    status: action.status
                })
            };
        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks
            };

        case addTodolistAC.type:
            return {
                ...state,
                [action.payload.todolist.id]: []
            };

        case removeTodolistAC.type:
            let stateCopy = {...state};
            delete stateCopy[action.payload.todolistId];
            return stateCopy;

        case setTodolistsAC.type:
            const copyState = {...state};
            action.payload.todolists.forEach((t: any) => {
                copyState[t.id] = [];
            });

            return copyState;
        default:
            return state;
    }
};

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const;
};


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId,
    } as const;
};

export const changeTaskTitleAC = (title: string, todolistId: string, taskId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        todolistId,
        title
    } as const;
};

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string,) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        todolistId,
        status,
    } as const;
};

export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todolistId,
    } as const;
};


export const setTaskTC = (todolistId: string) => {
    return (dispatch: taskReducerThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI.getTodolistTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.items, todolistId));
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
                dispatch(removeTaskAC(taskId, todolistId));
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
                    dispatch(addTaskAC(res.data.item));
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
                    dispatch(changeTaskStatusAC(taskId, status, todolistId));
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
                        dispatch(changeTaskTitleAC(title, todolistId, taskId));
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
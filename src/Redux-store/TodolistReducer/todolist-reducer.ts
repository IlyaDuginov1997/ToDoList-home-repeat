import {todolistsAPI, TodolistType} from '../../API/todolists-api';
import {FilterType} from '../../Components/TodolistsList';
import {Dispatch} from 'redux';
import {RequestStatusType, setAppError, setAppStatus} from '../AppReducer/app-reducer';
import {handlerServerAppError, handlerServerNetworkError} from '../../Helep-functions/error-utils';

export type AllTodolistTypes = AddTodolistType
    | RemoveTodolistType
    | ChangeTitleTodolistType
    | ChangeFilterTodolistType
    | SetTodolistsType
    | SetTodolistStatusType

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    todolistEntityStatus: RequestStatusType
}

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type ChangeTitleTodolistType = ReturnType<typeof changeTitleTodolistAC>
export type ChangeFilterTodolistType = ReturnType<typeof changeFilterTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>
export type SetTodolistStatusType = ReturnType<typeof setTodolistStatus>


const initialState: TodolistDomainType[] = [];

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: AllTodolistTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {
                ...action.todolist,
                filter: 'All',
                todolistEntityStatus: 'succeeded'
            };
            return [newTodolist, ...state,];
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id !== action.todolistId);
        case 'CHANGE-TITLE-TODOLIST':
            return state.map((tl) => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
        case 'SET-TODOLISTS':
            return action.todolists.map(t => {
                    return {
                        ...t,
                        filter: 'All',
                        todolistEntityStatus: 'succeeded',
                    };
                }
            );
        case 'TODO/SET-STATUS':
            return state.map((td) => td.id === action.todolistId
                ? {
                    ...td,
                    todolistEntityStatus: action.todolistEntityStatus
                }
                : td);
        default:
            return state;
    }
};

export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const;
};

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId,
    } as const;
};

export const changeTitleTodolistAC = (title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        todolistId,
        title,
    } as const;
};

export const changeFilterTodolistAC = (filter: FilterType, todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        todolistId,
        filter,
    } as const;
};

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const;
};

export const setTodolistStatus = (todolistEntityStatus: RequestStatusType, todolistId: string) => {
    return {
        type: 'TODO/SET-STATUS',
        todolistEntityStatus,
        todolistId,
    } as const;
};

export const setTodolistTC = () => {
    return (dispatch: todolistReducerThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res));
                dispatch(setAppStatus('succeeded'));
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch);
            });
    };
};

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: todolistReducerThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        dispatch(setTodolistStatus('loading', todolistId));
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId));
                dispatch(setAppStatus('succeeded'));
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch);
            });
    };
};

export const addTodolistTC = (title: string) => {
    return (dispatch: todolistReducerThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        todolistsAPI.createTodolist(title)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.item));
                    dispatch(setAppStatus('succeeded'));
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

export const changeTodolistTitleTC = (title: string, todolistId: string) => {
    return (dispatch: todolistReducerThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        dispatch(setTodolistStatus('loading', todolistId));
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(changeTitleTodolistAC(title, todolistId));
                    dispatch(setAppStatus('succeeded'));
                } else {
                    // util helper-function
                    handlerServerAppError(res, dispatch);
                }
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch);
            })
            .finally(() => {
                dispatch(setTodolistStatus('succeeded', todolistId));
            });
    };
};


export type todolistReducerThunkDispatch = Dispatch<AllTodolistTypes
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>>
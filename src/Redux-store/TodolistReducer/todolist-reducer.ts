import {todolistsAPI, TodolistType} from '../../API/todolists-api';
import {FilterType} from '../../Components/TodolistsList';
import {Dispatch} from 'redux';
import {RequestStatusType, setStatusPreloader} from '../AppReducer/app-reducer';

export type AllTodolistTypes = AddTodolistType
    | RemoveTodolistType
    | ChangeTitleTodolistType
    | ChangeFilterTodolistType
    | SetTodolistsType
    | SetTodolistStatusType

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
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
            let newTodolist: TodolistDomainType = {...action.todolist, filter: 'All', entityStatus: 'succeeded'};
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
                        entityStatus: 'succeeded',
                    };
                }
            );
        case 'TODO/SET-STATUS':
            return state.map((td) => td.id === action.todolistId
                ? {
                    ...td,
                    entityStatus: action.status
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

export const setTodolistStatus = (status: RequestStatusType, todolistId: string) => {
    return {
        type: 'TODO/SET-STATUS',
        status,
        todolistId,
    } as const;
};

export const setTodolistTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusPreloader('loading'));
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res));
                dispatch(setStatusPreloader('succeeded'));
            });
    };
};

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusPreloader('loading'));
        dispatch(setTodolistStatus('loading', todolistId));
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId));
                dispatch(setStatusPreloader('succeeded'));
                dispatch(setTodolistStatus('succeeded', todolistId));
            });
    };
};

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusPreloader('loading'));
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.item));
                dispatch(setStatusPreloader('succeeded'));
            });
    };
};

export const changeTodolistTitleTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusPreloader('loading'));
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTitleTodolistAC(title, todolistId));
                dispatch(setStatusPreloader('succeeded'));
            });
    };
};

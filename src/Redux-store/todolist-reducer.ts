import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../API/todolists-api';
import {FilterType} from '../AppWithRedux';
import {Dispatch} from 'redux';

export type AllTodolistTypes = AddTodolistType
    | RemoveTodolistType
    | ChangeTitleTodolistType
    | ChangeFilterTodolistType
    | SetTodolistsType

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type ChangeTitleTodolistType = ReturnType<typeof changeTitleTodolistAC>
export type ChangeFilterTodolistType = ReturnType<typeof changeFilterTodolistAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>


const initialState: TodolistDomainType[] = [];

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: AllTodolistTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {
                id: action.todolistId, title: action.title, filter: 'All', addedDate: '', order: 0,
            };
            return [...state, newTodolist];
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
                        filter: 'All'
                    };
                }
            );

        default:
            return state;
    }
};

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId: v1(),
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

export const setTodolistTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res));
            });
    };
};

import {todolistsAPI, TodolistType} from '../../API/todolists-api';
import {FilterType} from '../../Components/TodolistsList';
import {Dispatch} from 'redux';
import {RequestStatusType, setAppError, setAppStatus} from '../AppReducer/app-reducer';
import {handlerServerAppError, handlerServerNetworkError} from '../../Helep-functions/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'All', todolistEntityStatus: 'succeeded'},);
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const indexEl = state.findIndex(t => t.id === action.payload.todolistId);
            state.splice(indexEl, 1);
        },
        changeTitleTodolistAC(state, action: PayloadAction<{ title: string, todolistId: string }>) {
            const indexEl = state.findIndex(t => t.id === action.payload.todolistId);
            state[indexEl].title = action.payload.title;
        },
        changeFilterTodolistAC(state, action: PayloadAction<{ filter: FilterType, todolistId: string }>) {
            const indexEl = state.findIndex(t => t.id === action.payload.todolistId);
            state[indexEl].filter = action.payload.filter;
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(t => {
                return {
                    ...t,
                    filter: 'All',
                    todolistEntityStatus: 'succeeded',
                };
            });
        },
        setTodolistStatus(state, action: PayloadAction<{ todolistEntityStatus: RequestStatusType, todolistId: string }>) {
            const indexEl = state.findIndex(t => t.id === action.payload.todolistId);
            state[indexEl].todolistEntityStatus = action.payload.todolistEntityStatus;
        },
    }
});

export const {
    addTodolistAC,
    removeTodolistAC,
    changeTitleTodolistAC,
    changeFilterTodolistAC,
    setTodolistsAC,
    setTodolistStatus
} = slice.actions;
export const todolistReducer = slice.reducer;

// export const todolistReducer = (state: TodolistDomainType[] = initialState, action: AllTodolistTypes): TodolistDomainType[] => {
//     switch (action.type) {
//         case 'ADD-TODOLIST':
//             let newTodolist: TodolistDomainType = {
//                 ...action.todolist,
//                 filter: 'All',
//                 todolistEntityStatus: 'succeeded'
//             };
//             return [newTodolist, ...state,];
//         case 'REMOVE-TODOLIST':
//             return state.filter((tl) => tl.id !== action.todolistId);
//         case 'CHANGE-TITLE-TODOLIST':
//             return state.map((tl) => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map((tl) => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
//         case 'SET-TODOLISTS':
//             return action.todolists.map(t => {
//                     return {
//                         ...t,
//                         filter: 'All',
//                         todolistEntityStatus: 'succeeded',
//                     };
//                 }
//             );
//         case 'TODO/SET-STATUS':
//             return state.map((td) => td.id === action.todolistId
//                 ? {
//                     ...td,
//                     todolistEntityStatus: action.todolistEntityStatus
//                 }
//                 : td);
//         default:
//             return state;
//     }
// };

export const setTodolistTC = () => {
    return (dispatch: todolistReducerThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC({todolists: res}));
                dispatch(setAppStatus({status: 'succeeded'}));
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch);
            });
    };
};

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: todolistReducerThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        dispatch(setTodolistStatus({todolistEntityStatus: 'loading', todolistId}));
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC({todolistId}));
                dispatch(setAppStatus({status: 'succeeded'}));
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch);
            });
    };
};

export const addTodolistTC = (title: string) => {
    return (dispatch: todolistReducerThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI.createTodolist(title)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: res.data.item}));
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
    };
};

export const changeTodolistTitleTC = (title: string, todolistId: string) => {
    return (dispatch: todolistReducerThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        dispatch(setTodolistStatus({todolistEntityStatus: 'loading', todolistId}));
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(changeTitleTodolistAC({title, todolistId}));
                    dispatch(setAppStatus({status: 'succeeded'}));
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
                dispatch(setTodolistStatus({todolistEntityStatus: 'succeeded', todolistId}));
            });
    };
};


export type todolistReducerThunkDispatch = Dispatch<AllTodolistTypes
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>>
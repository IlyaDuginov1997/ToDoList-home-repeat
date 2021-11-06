import {setTodolistStatus} from '../TodolistReducer/todolist-reducer';
import {loginAPI, LoginParamsType} from '../../API/todolists-api';
import {Dispatch} from 'redux';
import {setAppError, setAppStatus} from '../AppReducer/app-reducer';
import {handlerServerAppError, handlerServerNetworkError} from '../../Helep-functions/error-utils';
import {addTaskAC} from '../TaskReducer/tasks-reducer';

export type AllTasksTypes = ReturnType<typeof setIsLogedIn>

const initialState = {
    isLoading: false
};
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AllTasksTypes): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGED-IN':
            return {
                ...state,
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
};

export const setIsLogedIn = (isLoading: boolean) => {
    return {
        type: 'LOGIN/SET-IS-LOGED-IN',
        isLoading
    } as const;
};

export const setIsLogedInTC = (loginParams: LoginParamsType) => {
    return (dispatch: authReducerThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        loginAPI.login(loginParams)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(setIsLogedIn(true));
                    dispatch(setAppStatus('succeeded'));
                } else {
                    // util helper-function
                    handlerServerAppError(res, dispatch);
                }
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch)
            });
    };
};

export const checkIsLogedInTC = () => {
    return (dispatch: authReducerThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        loginAPI.me()
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(setIsLogedIn(true));
                    dispatch(setAppStatus('succeeded'));
                } else {
                    // util helper-function
                    handlerServerAppError(res, dispatch);
                }
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch)
            });
    };
};

export type authReducerThunkDispatch = Dispatch<AllTasksTypes
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setTodolistStatus>>
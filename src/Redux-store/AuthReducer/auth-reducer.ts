import {setTodolistStatus} from '../TodolistReducer/todolist-reducer';
import {loginAPI, LoginParamsType} from '../../API/todolists-api';
import {Dispatch} from 'redux';
import {setAppError, setAppStatus} from '../AppReducer/app-reducer';
import {handlerServerAppError, handlerServerNetworkError} from '../../Helep-functions/error-utils';

export type AllTasksTypes =
    ReturnType<typeof setIsLoggedIn> |
    ReturnType<typeof checkIsAuthorized>

const initialState = {
    isLogged: false,
    isAuthorized: false,
};
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AllTasksTypes): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {
                ...state,
                isLogged: action.isLogged,
            };
        case 'LOGIN/CHECK-IS-AUTHORIZED':
            return {
                ...state,
                isAuthorized: action.isAuthorized,
            };
        default:
            return state;
    }
};

export const setIsLoggedIn = (isLogged: boolean) => {
    return {
        type: 'LOGIN/SET-IS-LOGGED-IN',
        isLogged
    } as const;
};

export const checkIsAuthorized = (isAuthorized: boolean) => {
    return {
        type: 'LOGIN/CHECK-IS-AUTHORIZED',
        isAuthorized
    } as const;
};

export const setIsLoggedInTC = (loginParams: LoginParamsType) => {
    return (dispatch: authReducerThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        loginAPI.login(loginParams)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(setIsLoggedIn(true));
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

export const setIsLoggedOutTC = () => {
    return (dispatch: authReducerThunkDispatch) => {
        dispatch(setAppStatus('loading'));
        loginAPI.logout()
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(setIsLoggedIn(false));
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

export const checkIsAuthorizedTC = () => {
    return (dispatch: authReducerThunkDispatch) => {
        loginAPI.me()
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(setIsLoggedIn(true));
                }
                dispatch(checkIsAuthorized(true));
            })
            .catch(err => {
                // util helper-function
                handlerServerNetworkError(err, dispatch);
            });
    };
};

export type authReducerThunkDispatch = Dispatch<AllTasksTypes
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setTodolistStatus>>
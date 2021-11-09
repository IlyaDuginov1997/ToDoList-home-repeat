import {setTodolistStatus} from '../TodolistReducer/todolist-reducer';
import {loginAPI, LoginParamsType} from '../../API/todolists-api';
import {Dispatch} from 'redux';
import {setAppError, setAppStatus} from '../AppReducer/app-reducer';
import {handlerServerAppError, handlerServerNetworkError} from '../../Helep-functions/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AllTasksTypes =
    ReturnType<typeof setIsLoggedIn> |
    ReturnType<typeof checkIsAuthorized>

const initialState = {
    isLogged: false,
    isAuthorized: false,
};
export type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{isLogged: boolean}>) {
            state.isLogged = action.payload.isLogged
        },
        checkIsAuthorized(state, action: PayloadAction<{isAuthorized: boolean}>) {
            state.isAuthorized = action.payload.isAuthorized
        }
    }
})

export const {setIsLoggedIn, checkIsAuthorized} = slice.actions
export const authReducer = slice.reducer

export const setIsLoggedInTC = (loginParams: LoginParamsType) => {
    return (dispatch: authReducerThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        loginAPI.login(loginParams)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(setIsLoggedIn({isLogged: true}));
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

export const setIsLoggedOutTC = () => {
    return (dispatch: authReducerThunkDispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        loginAPI.logout()
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(setIsLoggedIn({isLogged: false}));
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

export const checkIsAuthorizedTC = () => {
    return (dispatch: authReducerThunkDispatch) => {
        loginAPI.me()
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(setIsLoggedIn({isLogged: true}));
                }
                dispatch(checkIsAuthorized({isAuthorized: true}));
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
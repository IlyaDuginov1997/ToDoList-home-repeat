import {CommonTodolistType, CreateTodolistTasksType} from '../API/todolists-api';
import {setAppError, setAppStatus} from '../Redux-store/AppReducer/app-reducer';
import {Dispatch} from 'redux';

export const handlerServerAppError = <T>(res: CommonTodolistType<T> | CreateTodolistTasksType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (res.messages.length) {
        dispatch(setAppError(res.messages[0]));
    } else {
        dispatch(setAppError('We have some troubles. Сonnect with technical support'));
    }
    dispatch(setAppStatus('failed'));
};


export const handlerServerNetworkError = <T>(err: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppError(err.message));
    dispatch(setAppStatus('failed'));
};

export type ErrorUtilsDispatchType = Dispatch<ReturnType<typeof setAppError>
    | ReturnType<typeof setAppStatus>>

import {CommonTodolistType, CreateTodolistTasksType} from '../API/todolists-api';
import {setAppError, setAppStatus} from '../Redux-store/AppReducer/app-reducer';
import {Dispatch} from 'redux';

export const handlerServerAppError = <T>(res: CommonTodolistType<T> | CreateTodolistTasksType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (res.messages.length) {
        dispatch(setAppError({error: res.messages[0]}));
    } else {
        dispatch(setAppError({error: 'We have some troubles. Сonnect with technical support'}));
    }
    dispatch(setAppStatus({status: 'failed'}));
};


export const handlerServerNetworkError = <T>(err: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppError(err.message ? {error: err.message} : {error: 'Some error occurred'}));
    dispatch(setAppStatus({status: 'failed'}));
};

export type ErrorUtilsDispatchType = Dispatch<ReturnType<typeof setAppError>
    | ReturnType<typeof setAppStatus>>

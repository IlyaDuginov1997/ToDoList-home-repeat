import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppPreloaderStateType = {
    status: RequestStatusType,
    error: string | null
}

export type AppTypes = ReturnType<typeof setAppStatus> |
    ReturnType<typeof setAppError>

const initialState: AppPreloaderStateType = {
    status: 'succeeded',
    error: null,
};

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError} = slice.actions

//
// export const appReducer = (state: AppPreloaderStateType = initialState, action: AppTypes): AppPreloaderStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {
//                 ...state,
//                 status: action.status
//             };
//         case 'APP/SET-ERROR':
//             return {
//                 ...state,
//                 error: action.error
//             };
//         default:
//             return state;
//     }
// };

// export const setAppStatus = (status: RequestStatusType) => {
//     return {
//         type: 'APP/SET-STATUS',
//         status,
//     } as const;
// };
//
// export const setAppError = (error: string | null) => {
//     return {
//         type: 'APP/SET-ERROR',
//         error,
//     } as const;
// };
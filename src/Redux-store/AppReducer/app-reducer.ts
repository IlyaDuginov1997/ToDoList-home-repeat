export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppPreloaderStateType = {
    status: RequestStatusType,
    error: string | null
}

export type AppTypes = ReturnType<typeof setStatusPreloader> |
    ReturnType<typeof setError>

const initialState: AppPreloaderStateType = {
    status: 'succeeded',
    error: null,
};

export const appReducer = (state: AppPreloaderStateType = initialState, action: AppTypes): AppPreloaderStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {
                ...state,
                status: action.status
            };
        case 'APP/SET-ERROR':
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

export const setStatusPreloader = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status,
    } as const;
};

export const setError = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error,
    } as const;
};
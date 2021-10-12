export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppPreloaderStateType = {
    status: RequestStatusType
}

export type AppTypes = ReturnType<typeof setStatusPreloader>

const initialState: AppPreloaderStateType = {
    status: 'succeeded'
};

export const appReducer = (state: AppPreloaderStateType = initialState, action: AppTypes): AppPreloaderStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {
                ...state,
                status: action.status
            };

        default:
            return state;
    }
};

export const setStatusPreloader = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-ERROR',
        status,
    } as const;
};
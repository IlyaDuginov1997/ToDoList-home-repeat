import {AppPreloaderStateType, appReducer, setAppStatus, setAppError} from './app-reducer';

let startState: AppPreloaderStateType
beforeEach(() => {
        startState = {
            status: 'succeeded',
            error: null
        };
    }
);

test('status should be failed', () => {
    const endState = appReducer(startState, setAppStatus({status: 'failed'}));
    expect(endState.status).toBe('failed');
});

test('error should be setted', () => {
    const endState = appReducer(startState, setAppError({error: 'some troubles'}));
    expect(startState.error).toBe(null);
    expect(endState.error).toBe('some troubles');
});
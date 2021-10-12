import {AppPreloaderStateType, appReducer, setStatusPreloader} from './app-reducer';

let startState: AppPreloaderStateType
beforeEach(() => {
        startState = {
            status: 'succeeded'
        };
    }
);

test('status should be failed', () => {


    const endState = appReducer(startState, setStatusPreloader('failed'));

    expect(endState.status).toBe('failed');

});

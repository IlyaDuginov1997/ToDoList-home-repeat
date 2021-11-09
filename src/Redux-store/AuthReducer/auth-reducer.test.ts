import {authReducer, checkIsAuthorized, InitialStateType, setIsLoggedIn} from './auth-reducer';

let startState: InitialStateType;
beforeEach(() => {
    startState = {
        isLogged: false,
        isAuthorized: false,
    };
});

test('logged condition should be changed', () => {
    const endState = authReducer(startState, setIsLoggedIn({isLogged: true}));
    expect(endState.isLogged).toBeTruthy()
});

test('authorization should be established', () => {
    const endState = authReducer(startState, checkIsAuthorized({isAuthorized: true}));
    expect(endState.isAuthorized).toBeTruthy()
});
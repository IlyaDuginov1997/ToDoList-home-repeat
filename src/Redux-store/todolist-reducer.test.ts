import {v1} from 'uuid';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    TodolistDomainType,
    todolistReducer
} from './todolist-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All', order: 0, addedDate: '',},
        {id: todolistId2, title: 'What to buy', filter: 'All', order: 0, addedDate: '',}
    ];
});

test('todolist will be added', () => {
    let newTodolistTitle = 'New todolist';

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('What to buy');
});

test('change title of todolist', () => {
    const endState = todolistReducer(startState, changeTitleTodolistAC('What to listen', todolistId1));

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('What to listen');
    expect(endState[1].title).toBe('What to buy');
});

test('change filter of todolist', () => {
    const endState = todolistReducer(startState, changeFilterTodolistAC('Completed', todolistId1));

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('Completed');
    expect(endState[1].filter).toBe('All');
});


import {TodolistType} from '../App';
import {v1} from 'uuid';
import {
    addTodolistTypeAC,
    changeFilterTodolistTypeAC,
    changeTitleTodolistTypeAC,
    removeTodolistTypeAC,
    todolistReducer
} from './todolist-reducer';

test('todolist will be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New todolist'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistReducer(startState, addTodolistTypeAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistReducer(startState, removeTodolistTypeAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
})

test('change title of todolist', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistReducer(startState, changeTitleTodolistTypeAC(todolistId1, 'What to listen'))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to listen')
    expect(endState[1].title).toBe('What to buy')
})

test('change filter of todolist', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistReducer(startState, changeFilterTodolistTypeAC(todolistId1, 'Complited'))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('Complited')
    expect(endState[1].filter).toBe('All')
})
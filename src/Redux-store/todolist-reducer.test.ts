import {TodolistType} from '../App';
import {v1} from 'uuid';
import {addTodolistTypeAC, todolistReducer} from './todolist-reducer';

test('todolist will be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New todolist'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistReducer(startState, addTodolistTypeAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})
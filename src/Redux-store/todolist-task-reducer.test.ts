import {addTodolistAC, TodolistDomainType, todolistReducer} from './todolist-reducer';
import {taskReducer} from './tasks-reducer';
import {TasksType} from '../AppWithRedux';

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});



import {TasksType, TodolistType} from '../App';
import {addTodolistTypeAC, todolistReducer} from './todolist-reducer';
import {taskReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: TodolistType[] = [];

    const action = addTodolistTypeAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});



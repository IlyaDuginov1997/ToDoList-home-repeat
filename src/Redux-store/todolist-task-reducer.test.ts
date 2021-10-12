import {addTodolistAC, TodolistDomainType, todolistReducer} from './TodolistReducer/todolist-reducer';
import {taskReducer} from './TaskReducer/tasks-reducer';
import {TasksType} from '../Components/TodolistsList';

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    const newTodolist = {id: 'todolistId', title: 'What to learn', filter: 'All', order: 0, addedDate: '',}
    const action = addTodolistAC(newTodolist);

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});



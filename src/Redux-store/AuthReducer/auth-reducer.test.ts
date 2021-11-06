import {addTaskAC} from './auth-reducer';
import {TasksType} from '../../Components/TodolistsList';
import {TaskPriorities, TaskStatuses} from '../../API/todolists-api';

let startState: TasksType = {};
beforeEach(() => {
        startState = {};
    }
);

test('new task will be added', () => {
    let newTask = {
        id: '4', status: TaskStatuses.New, title: 'Beer', addedDate: '', order: 0, deadline: '',
        description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: 'todolistId2'
    };

    // const endState = taskReducer(startState, addTaskAC(newTask));

    // expect(endState['todolistId1'].length).toBe(3);
    // expect(endState['todolistId2'].length).toBe(4);
    // expect(endState['todolistId2'][0].title).toBe('Beer');
    // expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
    // expect(endState['todolistId2'][0].id).toBeDefined();
});
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from './tasks-reducer';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC} from './todolist-reducer';
import {TasksType} from '../AppWithRedux';
import {TaskPriorities, TaskStatuses} from '../API/todolists-api';

let startState: TasksType = {};
beforeEach(() => {
        startState = {
            ['todolistId1']: [
                {
                    id: '1', status: TaskStatuses.Completed, title: 'HTML&CSS', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: 'todolistId1'
                },
                {
                    id: '2', status: TaskStatuses.New, title: 'React', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: 'todolistId1'
                },
                {
                    id: '3', status: TaskStatuses.New, title: 'Redux', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: 'todolistId1'
                },
            ],
            ['todolistId2']: [
                {
                    id: '1', status: TaskStatuses.Completed, title: 'Meat', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: 'todolistId1'
                },
                {
                    id: '2', status: TaskStatuses.New, title: 'Bread', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: 'todolistId2'
                },
                {
                    id: '3', status: TaskStatuses.New, title: 'Milk', addedDate: '', order: 0, deadline: '',
                    description: '', priority: TaskPriorities.Hi, startDate: '', todoListId: 'todolistId2'
                },
            ],
        };
    }
);

test('new task will be added', () => {
    // let newTaskTitle = 'Beer'

    const endState = taskReducer(startState, addTaskAC('Beer', 'todolistId2'));

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][3].title).toBe('Beer');
    expect(endState['todolistId2'][3].status).toBe(0);
    expect(endState['todolistId2'][3].id).toBeDefined();
});

test('task will be removed', () => {

    let removedTaskId = startState['todolistId1'][1].id;

    const endState = taskReducer(startState, removeTaskAC(removedTaskId, 'todolistId1'));

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'][0].title).toBe('HTML&CSS');
    expect(endState['todolistId1'][1].title).toBe('Redux');
});


test('change task title', () => {
    const endState = taskReducer(startState, changeTaskTitleAC('Java', 'todolistId1', '2',));


    expect(endState['todolistId1'][0].title).toBe('HTML&CSS');
    expect(endState['todolistId1'][1].title).toBe('Java');
    expect(endState['todolistId2'][1].title).toBe('Bread');
});


test('change task status', () => {
    const endState = taskReducer(startState, changeTaskStatusAC('2', TaskStatuses.Completed, 'todolistId1',));


    expect(endState['todolistId1'][0].status).toBe(2);
    expect(endState['todolistId1'][1].status).toBe(2);
    expect(endState['todolistId2'][1].status).toBe(0);
});

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist');

    const endState = taskReducer(startState, action);


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2');

    const endState = taskReducer(startState, action);


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});
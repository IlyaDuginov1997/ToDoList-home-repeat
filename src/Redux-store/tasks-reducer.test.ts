import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer
} from './tasks-reducer';
import {TasksType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC} from './todolist-reducer';


test('new task will be added', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'Redux'},
        ],
        'todolistId2': [
            {id: v1(), isDone: true, title: 'Meat'},
            {id: v1(), isDone: false, title: 'Bread'},
            {id: v1(), isDone: false, title: 'Milk'},
        ],
    }

    // let newTaskTitle = 'Beer'

    const endState = taskReducer(startState, addTaskAC('Beer', 'todolistId2'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][3].title).toBe('Beer')
    expect(endState['todolistId2'][3].isDone).toBeFalsy()
    expect(endState['todolistId2'][3].id).toBeDefined()
})

test('task will be removed', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', isDone: true, title: 'HTML&CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'Redux'},
        ],
        'todolistId2': [
            {id: '1', isDone: true, title: 'Meat'},
            {id: '2', isDone: false, title: 'Bread'},
            {id: '3', isDone: false, title: 'Milk'},
        ],
    }

    let removedTaskId = startState['todolistId1'][1].id

    const endState = taskReducer(startState, removeTaskAC(removedTaskId, 'todolistId1'))

    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][0].title).toBe('HTML&CSS')
    expect(endState['todolistId1'][1].title).toBe('Redux')
})


test('change task title', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', isDone: true, title: 'HTML&CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'Redux'},
        ],
        'todolistId2': [
            {id: '1', isDone: true, title: 'Meat'},
            {id: '2', isDone: false, title: 'Bread'},
            {id: '3', isDone: false, title: 'Milk'},
        ],
    }

    const endState = taskReducer(startState, changeTaskTitleAC('Java', 'todolistId1', '2',))


    expect(endState['todolistId1'][0].title).toBe('HTML&CSS')
    expect(endState['todolistId1'][1].title).toBe('Java')
    expect(endState['todolistId2'][1].title).toBe('Bread')
})


test('change task status', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', isDone: true, title: 'HTML&CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'Redux'},
        ],
        'todolistId2': [
            {id: '1', isDone: true, title: 'Meat'},
            {id: '2', isDone: false, title: 'Bread'},
            {id: '3', isDone: false, title: 'Milk'},
        ],
    }

    const endState = taskReducer(startState, changeTaskStatusAC('2', true, 'todolistId1',))


    expect(endState['todolistId1'][0].isDone).toBeTruthy()
    expect(endState['todolistId1'][1].isDone).toBeTruthy()
    expect(endState['todolistId2'][1].isDone).toBeFalsy()
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', isDone: true, title: 'HTML&CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'Redux'},
        ],
        'todolistId2': [
            {id: '1', isDone: true, title: 'Meat'},
            {id: '2', isDone: false, title: 'Bread'},
            {id: '3', isDone: false, title: 'Milk'},
        ],
    }

    const action = addTodolistAC('new todolist');

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    };

    const action = removeTodolistAC('todolistId2');

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});
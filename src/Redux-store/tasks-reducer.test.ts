import {addTaskTypeAC, taskReducer} from './tasks-reducer';
import {TasksType} from '../App';
import {v1} from 'uuid';



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

    const endState = taskReducer(startState, addTaskTypeAC('Beer', 'todolistId2'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][3].title).toBe('Beer')
    expect(endState['todolistId2'][3].isDone).toBeFalsy()
    expect(endState['todolistId2'][3].id).toBeDefined()
})


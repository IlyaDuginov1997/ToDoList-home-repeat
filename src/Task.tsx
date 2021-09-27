import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from './EditableSpan';
import {TaskStatuses, TaskType} from './API/todolists-api';

export type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const removeTask = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId);
    }, [props.removeTask, props.task.id, props.todolistId]);

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id,
            e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
            props.todolistId);
    }, [props.changeTaskStatus, props.task.id, props.todolistId]);

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(title, props.todolistId, props.task.id);
    }, [props.changeTaskTitle, props.todolistId, props.task.id]);

    return (
        <li
            key={props.task.id}
            className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <input
                type="checkbox"
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatus}/>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <button onClick={removeTask}>x</button>
        </li>
    );
});
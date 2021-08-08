import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<boolean>(false)

    const addTitle = () => {
        if (title.trim()) {
            props.addItem(title)
            setTitle('')
        } else {
            setError(true)
        }
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTitle()
        }
    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onKeyPress={onKeyPressHandler}
                onChange={changeHandler}/>
            <button onClick={addTitle}>+</button>
            {error && <div className={'error-message'}>Title is required</div>}
        </div>
    )
}
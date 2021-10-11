import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('Editable span is called')

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState(props.title)

    const OnEditMode = () => {
        setEditMode(true)
    }
    const OffEditMode = () => {
        // regular expression
        setTitle(title.trim().replace(/\s+/g, ' '))
        props.changeTitle(title)
        setEditMode(false)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            setTitle(title.trim().replace(/\s+/g, ' '))
            props.changeTitle(title)
            setEditMode(false)
        }
    }

    return (
        <>
            <span>
                {editMode
                    ? <TextField
                        onKeyPress={onKeyPressHandler}
                        onChange={changeTitle}
                        autoFocus={true}
                        onBlur={OffEditMode}
                        value={title}/>
                    : <span
                        onDoubleClick={OnEditMode}> {props.title} </span>
                }
            </span>
        </>
    )
})
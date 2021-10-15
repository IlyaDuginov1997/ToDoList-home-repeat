import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {AddBox} from '@mui/icons-material';


export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm is called');

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const addTitle = () => {
        if (title.trim()) {
            props.addItem(title.trim().replace(/\s+/g, ' '));
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTitle();
        }
    };

    return (
        <div>
            <TextField
                size="small"
                className={error ? 'error' : ''}
                value={title}
                onKeyPress={onKeyPressHandler}
                label={'Title'}
                error={!!error}
                helperText={error}
                onChange={changeHandler}
                disabled={props.disabled}/>

            <IconButton
                onClick={addTitle}
                color="primary"
                disabled={props.disabled}
            >
                <AddBox/>
            </IconButton>

            {/*{error && <div className={'error-message'}>Title is required</div>}*/}
        </div>
    );
});
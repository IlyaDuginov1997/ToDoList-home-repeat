import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {TodolistsList} from './TodolistsList';
import {StatusPreloader} from './StatusPreloader';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../Redux-store/Store';
import {RequestStatusType} from '../Redux-store/AppReducer/app-reducer';
import { ErrorAlert } from './ErrorAlert';

export function AppWithRedux() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    return (
        <div className="App">
            <ErrorAlert/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <StatusPreloader/>}
            <TodolistsList/>

        </div>
    );
}
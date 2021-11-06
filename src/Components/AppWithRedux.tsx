import * as React from 'react';
import {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {TodolistsList} from './TodolistsList';
import {StatusPreloader} from './StatusPreloader';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../Redux-store/Store';
import {RequestStatusType} from '../Redux-store/AppReducer/app-reducer';
import {ErrorAlert} from './ErrorAlert';
import {Login} from './Login';
import {Redirect, Route, Switch} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {checkIsAuthorizedTC} from '../Redux-store/AuthReducer/auth-reducer';

export function AppWithRedux() {
    const dispatch = useDispatch()
    const statusPreloader = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isAuthorized = useSelector<AppRootStateType, boolean>(state => state.auth.isAuthorized);

    useEffect(() => {
        dispatch(checkIsAuthorizedTC())
    }, []);

    if(!isAuthorized) {
        return <div  style={{position: 'fixed', textAlign: 'center', width: '100%', top: '30%'}}>
            <CircularProgress/>
        </div>
    }

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
            {statusPreloader === 'loading' && <StatusPreloader/>}
            <Switch>

                <Route exact path={'/'} render={() => <TodolistsList/>} />
                <Route path={'/login'} render={() => <Login/>} />
                <Route path={'/404'} render={() => <h1>Hey</h1>} />
                <Redirect from={'*'} to={'/404'} />
            </Switch>
        </div>
    );
}
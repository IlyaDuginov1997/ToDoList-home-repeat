import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {checkIsLogedInTC, setIsLogedInTC} from '../Redux-store/AuthReducer/auth-reducer';
import {AppRootStateType} from '../Redux-store/Store';
import {Redirect} from 'react-router-dom';

export type FormikValuesType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useDispatch();
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.auth.isLoading);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikValuesType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            } else if (values.password.length <= 2) {
                errors.password = 'Password should contain more than 2 symbols';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(setIsLogedInTC({...values, captcha: true}));
            // console.log({...values,captcha: true})
            // alert('Yo')
            // formik.resetForm();
        }
    });
    if (isLoading) {
        return <Redirect to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email
                            ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                            : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password
                            ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                            : null}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox/>}
                            {...formik.getFieldProps('rememberMe')}
                        />

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>;
};

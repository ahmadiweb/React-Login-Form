import React, { useState, useEffect, useLayoutEffect } from 'react'
import './style.css'
import { useAuthDispatch, useAuthState } from '../../Context/auth-context'
import { actionType } from '../../Context/reduser'
import { fetchToken, fetchUserData } from '../../FetchInfoLogin/fetchInfoLogin'
import { loginActionUser } from '../../functions'




export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ username: '', password: '', token: '' })
    const { username, password, token } = loginFormData
    const dispatch = useAuthDispatch();
    const { loading } = useAuthState();

    const handleForm = (e) => {
        e.preventDefault();
        fetchToken(username, password)
            .then(({ success, data, error }) => {
                try {
                    if (!success) {
                        setLoginFormData({
                            username: '',
                            password: '',
                            token: null,
                        })
                        throw error
                    } else {
                        dispatch(loginActionUser(actionType.LOGIN_REQUST))
                        setLoginFormData({
                            username: '',
                            password: '',
                            token: data,
                        })
                    }
                } catch (err) {
                    alert(err)

                }

            })
    }

    useLayoutEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            dispatch(loginActionUser(actionType.LOGIN_REQUST))
            setLoginFormData(state => {
                return {
                    ...state,
                    token: token
                }
            })
        }

    }, [dispatch])

    useEffect(() => {
        if (token) {
            fetchUserData(token).then(({ success, data }) => {
                if (success) {
                    localStorage.setItem('token', token)
                    dispatch(loginActionUser(
                        actionType.LOGIN_SUCCESS, {
                        user: data.name,
                        token: token
                    })
                    )
                }
            })
        }
    }, [token])


    return (
        <>
            {
                loading ?
                    <p>loading</p> :
                    <div className="login">
                        <h1>Login</h1>
                        <form method="post" onSubmit={handleForm}>
                            <input
                                value={username}
                                onChange={(e) => setLoginFormData(state => {
                                    return {
                                        ...state,
                                        username: e.target.value
                                    }
                                })}
                                type="text"
                                placeholder="Username"
                                required="required"
                            />
                            <input
                                value={password}
                                onChange={(e) => setLoginFormData(state => {
                                    return {
                                        ...state,
                                        password: e.target.value
                                    }
                                })}
                                type="password"
                                name='password'
                                placeholder="Password"
                                required="required"
                            />
                            <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
                        </form>
                    </div>
            }
        </>
    )
}

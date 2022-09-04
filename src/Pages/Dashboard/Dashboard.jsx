import React from 'react'
import { useAuthDispatch } from '../../Context/auth-context';
import { loginActionUser } from '../../functions';
import { actionType } from '../../Context/reduser';

export default function Dashboard() {
    const dispatch = useAuthDispatch();


    const handleLogoutUser = () => {
        localStorage.removeItem('token');
        dispatch(loginActionUser(actionType.LOGOUT))
    }
    return (
        <>
            <div>Dashboard</div>
            <button onClick={handleLogoutUser} className="btn btn-primary btn-block btn-large">Logout</button>
        </>
    )
}

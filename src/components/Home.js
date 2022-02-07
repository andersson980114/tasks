import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { context, useAuth } from '../context/AuthContext';

export function Home() {

    const {user, logout, loading} = useAuth() 
 

    const handleLogOut = async () =>{
        await logout() 
    }

    if (loading) return <h1>loading</h1>
    return (
        <div>
            <h1>Welcome {user.email}</h1>

            <button onClick={handleLogOut}>LogOut</button>
        </div>
    );
}
 

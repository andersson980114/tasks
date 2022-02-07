import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function NavigateBar() {
    const {user, logout} = useAuth() 
    
    const handleLogOut = async () =>{
        await logout() 
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
             
                <div className="container-fluid">
                    
                    <a className="navbar-brand">DTechProjects</a>
                    <form className="d-flex"> 
                    <h1 className="navbar-brand">{user.email}</h1>
                    <button className="btn btn-outline-light" onClick={handleLogOut}>LogOut</button>
                    </form>
                </div>

            </nav> 

        </div>
    );
}

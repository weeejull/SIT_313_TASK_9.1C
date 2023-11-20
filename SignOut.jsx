import React, { useState, } from 'react';
import { signOut } from 'firebase/auth'; 
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import "./sign-out.css";
import Header from "./Header";

function Signout() {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate(); 

    const handleSignout = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            alert('You have been logged out');
            navigate('/');

        });
    };

    return (
        <div>
            <Header />
            <div className="ripped">
                
                <a>WELCOME TO MY APP!!</a>
                <button onClick={handleSignout}>Sign Out</button> 
            </div>
        </div>

    );
}

export default Signout
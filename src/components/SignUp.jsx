import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc'


const SignUp = ({ auth }) => {

    const signUpWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    return (
        <div className='signup-pg'>
            <button onClick={signUpWithGoogle} className="signup-btn" ><FcGoogle /> Sign in with Google</button>
        </div>
    )
}

export default SignUp

import './SignIn.css';
import React, {useState, useEffect} from 'react';

const SignIn = ({onRouteChange, loadUser}) => {
    
    const [signInEmail, setEmail] = useState('');
    const [signInPassword, setPassword] = useState('');
    

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }
    
    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id){ //Does the user exist? did we receive an user id?
                    loadUser(user);
                    onRouteChange('home');
                }
            })
        
    }

    return(
        <article className="signin-box shadow-2 center">
            <main className="black-80 center">
                <div className="measure sign-in-form">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw5 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw5 lh-copy f4" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={onEmailChange}
                            />
                            
                    </div>
                    <div className="mv3">
                        <label className="db fw5 lh-copy f4" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={onPasswordChange}   
                        />
                    </div>
                    </fieldset>
                    <div className="">
                        <input onClick={onSubmitSignIn} className="b ph5 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>   
    );
         
}

export default SignIn;
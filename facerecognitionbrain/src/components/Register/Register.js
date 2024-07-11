import './Register.css';
import React, {useState} from 'react';

const Register = ({onRouteChange, loadUser}) => {
    
    const [registerEmail, setEmail] = useState('');
    const [registerPassword, setPassword] = useState('');
    const [registerName, setName] = useState('');
    

    const onNameChange = (event) => {
        setName(event.target.value);
    }
    
    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }
    
    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }
    
    const onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: registerEmail,
                password: registerPassword,
                name: registerName
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    loadUser(user);
                    onRouteChange('home');
                }
            })
        
    }
    
    return(
        
        <article className="register-box shadow-2 center">
            <main className="black-80 center">
                <div className="measure register-form">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw5 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw5 lh-copy f4" htmlFor="name">Name</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange={onNameChange}
                        />
                    </div>
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
                        <input onClick={onSubmitRegister} className="b ph5 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Register"/>
                    </div>
                  
                </div>
            </main>
        </article>
        
    );
}

export default Register;
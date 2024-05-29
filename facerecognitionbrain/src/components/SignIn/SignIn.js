import React from 'react';
import './SignIn.css';

const SignIn = ({onRouteChange}) => {
    return(
        
        <article className="signin-box shadow-2 center">
            <main className="black-80 center">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw5 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw5 lh-copy f4" for="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw5 lh-copy f4" for="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent w-100" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div className="">
                        <input onClick={onRouteChange} className="b ph5 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0" className="f5 link dim black db">Register</a>
                    </div>
                </form>
            </main>
        </article>
        
    );
}

export default SignIn;
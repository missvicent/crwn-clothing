import React from "react";

import FormInput from './../form-input/form-input.component';
import CustomButton from './../custom-button/custom-button.component';

import { createUserProfileDocument, createWithEmailAndPassword } from './../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName : '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await createWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName : '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    render() {
        const { displayName, password, confirmPassword, email } = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have a access</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput type="text" onChange={this.handleChange} name="displayName" value={displayName} required label="Name" />
                    <FormInput type="email" onChange={this.handleChange} name="email" value={email} required label="Email" />
                    <FormInput type="password" onChange={this.handleChange} name="password" value={password} required  label="Password" />
                    <FormInput type="password" onChange={this.handleChange} name="confirmPassword" value={confirmPassword} required  label="confirm Password" />
                    <div className="buttons">
                        <CustomButton type="submit">Sign Up</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;
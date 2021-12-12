import React from "react";

import FormInput from "./../form-input/form-input.component";
import CustomButton from "./../custom-button/custom-button.component";

import { 
    signInWithGoogle, 
    signInEmailAndPassword } 
from "./../../firebase/firebase.utils";

import "./sign-in.styles.scss";

class SingIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const {email,  password } = this.state;

        try {
            await signInEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target;

        this.setState({[name]: value});
    }

    onClick = () => {
        signInWithGoogle();
    }

    render() {
        const { password, email } = this.state;
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput onChange={this.handleChange} name="email" value={email} required label="Email" />
                    <FormInput onChange={this.handleChange} name="password" value={password} required  label="Password" />
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton type="button" onClick={this.onClick} isGoogleSignIn>Sign in with google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SingIn;
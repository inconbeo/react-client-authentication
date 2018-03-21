import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {

    handleFormSubmit() {
        console.log(this.email.value, this.password.value)
        //need to do something to log user in
        this.props.signinUser({email: this.email.value, password: this.password.value})
    }

    render() {
        //handleSubmit comes from reduxForm
        const { handleSubmit } = this.props;

    return (
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
                <label>Email:</label>
                <input ref={email => this.email=email} className="form-control" />
            </fieldset>

            <fieldset className="form-group">
                <label>Password:</label>
                <input ref={password => this.password=password} className="form-control" />
            </fieldset>
            <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
    );
    }
}

//when we export, we wrapp the component with the reduxForm helper
//reduxForm will plave property name (form) in our application state
//reduxForm provide its own reducer in our application
export default reduxForm({
    form: 'signin'
}, null, actions)(Signin)
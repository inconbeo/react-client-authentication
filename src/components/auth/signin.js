import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
// import * as actions from '../../actions';
import {signinUser} from '../../actions';
import {connect} from 'react-redux';


class Signin extends Component {

    handleFormSubmit() {
        console.log(this.email.value, this.password.value)
        //need to do something to log user in
        return this.props.dispatch(signinUser({email: this.email.value, password: this.password.value}));
    }

    renderAlert() {
        if (this.props.errorMessage) {
            console.log('AAAAAAAA')
            return (
                <div className="alert alert-danger">
                    <strong>Opps!</strong> {this.props.errorMessage}
                </div>
            )
        }
        
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
                <input ref={password => this.password=password} type="password" className="form-control" />
            </fieldset>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
    );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.error
    }
}

//when we export, we wrapp the component with the reduxForm helper
//reduxForm will plave property name (form) in our application state
//reduxForm provide its own reducer in our application
export default reduxForm({
    form: 'signin'
})(connect(mapStateToProps)(Signin))

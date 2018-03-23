import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import renderField from './renderfield';
import {required, nonEmpty, matches, length, isTrimmed} from './validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');


class Signup extends Component {
    handleFormSubmit() {
        console.log('cccccc', this.email.value)
        this.props.signupUser({email: this.email.value, password: this.password.value});
    }
    
    renderAlert() {
        if (this.props.errorMessage) {
            return <div className="alert alert-danger">
            <strong>Opps!</strong> {this.props.errorMessage}
        </div>
        }
    }
    
    

    render() {
        const {handleSubmit} = this.props;
        
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                    name="email"
                    type="text"
                    component={renderField}
                    label="Email:"
                    validate={[required, nonEmpty, isTrimmed]}
                />

                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label="Password:"
                    validate={[required, passwordLength, isTrimmed]}
                />
                
                <Field
                    name="passwordConfirm"
                    type="password"
                    component={renderField}
                    label="Confirm Password:"
                    // we can access to the error returned by validator function via meta property in the renderField component
                    validate={[required, nonEmpty, matchesPassword]}
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up</button>
            </form>
        )
    }
    
}

//whenever the user try to make changes or submit the form, the validate function
//will be called with all the properties of the form (field names and values of the fields)


const mapStateToProps = state => {
    return {
        errorMessage: state.auth.error
    }
}


export default reduxForm({
    form: 'signup',
    
   
})(connect(mapStateToProps, actions)(Signup));
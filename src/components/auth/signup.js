import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

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
        const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input className="form-control" type="text" {...email}  ref={email => this.email=email} />
                    {/* {email.touched && email.error && <div className="error">{email.error}</div>} */}
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input className="form-control"  type="password" {...password} ref={password => this.password=password} />
                    {/* when there is error, it will be assigned to error property of idividual field object */}
                    {/* //if the user click into the field and click out and that field has an error
                    //then return a div with the content password.error */}
                    {/* {password.touched && password.error && <div className="error">{password.error}</div>} */}
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password</label>
                    <input className="form-control" {...passwordConfirm} ref={passwordConfirm => this.passwordConfirm=passwordConfirm} type="password" />
                    {/* {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>} */}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up</button>
            </form>
        )
    }
    
}

//whenever the user try to make changes or submit the form, the validate function
//will be called with all the properties of the form (field names and values of the fields)
function validate(formProps) {
    const errors = {};
    console.log(formProps);
    if(!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if(!formProps.password) {
        errors.password = 'Please enter an password';
    }

    if(!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter an passwordConfirm';
    }


    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match!'
    }
    

     return errors;
}

const mapStateToProps = state => {
    return {
        errorMessage: state.auth.error
    }
}


export default reduxForm({
    form: 'signup',
    validate,
    fields: ['email', 'password', 'passwordConfirm']
})(connect(mapStateToProps, actions)(Signup));
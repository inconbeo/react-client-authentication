import React, {Component} from 'react';
import {connect} from 'react-redux';


//HOC IS SOMETHING THAT WRAP THE COMPONENT WE ALREADY CREATED

//calling the functiong with the argument is the component you want to wrap 
export default function(ComposedComponent) {
    class Authentication extends Component {

        //static used to define class level property/object on class(Authentication)
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.push('/')
            }
        }

        //I will update when it is about to handle a new set of props 
        //or being re-renderred
        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.push('/')
            }
        }

        //context allow you to skip levels in component hierachy, React prevent you from busing this idead
        // by forecely want you to define contextTypes properties
        render() {
            console.log(this.props.authenticated)
            return <ComposedComponent {...this.props} />
        }
    }

    const mapStateToProps = state => {
        return {
            authenticated: state.auth.authenticated
        }
    }
    
        //returning the wrapper version
    return connect(mapStateToProps)(Authentication);
}

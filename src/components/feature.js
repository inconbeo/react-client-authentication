import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

    componentWillMount() {
        console.log('HHHHH')
        this.props.fetchMessage()
    }

    render() {
        return (
            <div>
                <div>this is a feature</div>
                {this.props.message}
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        message: state.auth.message
    }
}

export default connect(mapStateToProps, actions)(Feature);
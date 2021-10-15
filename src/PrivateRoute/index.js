import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.Component {

    render() {

        if(this.props.isLoggedIn) {
            return (
                <Route
                    render={() => <this.props.component path={this.props.path} userId={this.props.userId} {...this.props}/>}
                />
            );
            
        } else {
            return (<Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />);
        }
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    };
};
  
export default connect( mapStateToProps, null)(PrivateRoute);
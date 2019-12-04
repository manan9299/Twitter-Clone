import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class MessageUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.email}</td>
                <td><Link to={"/messageUser/" + this.props.obj._id} className="btn btn-primary">Message</Link></td>
            </tr>
        );
    }
}

export default withRouter(MessageUser);
import React, { Component } from 'react';
import axios from 'axios';
import MessageUser from './MessageUser';
import defaultValues from "../constants/defaultValues";

class MessageInbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: ''
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubToken');
        axios.get(defaultValues.serverURI+'/message/viewUsers')
            .then(res => {
                this.setState({ users: res.data });
            }).catch((err) => {
                console.log(err);
            });
    }

    tabRow() {
        if (this.state.users instanceof Array) {
            return this.state.users.map(function (object, i) {
                return <MessageUser obj={object} key={i} />;
            })
        }
    }

    render() {
        return (
            <div className="container">
                <h3>Message Inbox</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody> {this.tabRow()} </tbody>
                </table>
            </div>
        );
    }
}

export default MessageInbox;

import React, { Component } from 'react';
import axios from 'axios';
import defaultValues from "../constants/defaultValues";

class SendMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            chat: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubToken');
        axios.post(defaultValues.serverURI+'/message/getChat', { user: this.props.match.params.id })
            .then(res => {
                this.setState({ chat: res.data });
            }).catch((err) => {
                console.log(err);
            });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    messageUser = (e) => {
        
        if (this.state.message != "") {
            let data = {
                user: this.props.match.params.id,
                message: this.state.message
            }
            
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubToken');
            axios.post(defaultValues.serverURI+'/message/messageUser', data)
                .then(res => {
                    console.log(JSON.stringify(res));
                }).catch((err) => {
                    console.log(err);
                });
            
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubToken');
            axios.post(defaultValues.serverURI + '/message/getChat', { user: this.props.match.params.id })
                .then(res => {
                    this.setState({ chat: res.data });
                }).catch((err) => {
                    console.log(err);
                });

            this.setState({ message: "" });
        }
    }
        

    render() {
        return (
            <div>
                <h1 className="text-center">Chat</h1>
                <div className="row justify-content-md-center">
                    <div className="col-md-6 col-md-offset-3">
                        <form>
                            <div className="form-group">
                                {this.state.chat.map(c => (
                                    <div>
                                        <p><strong>Message:</strong> {c.message}</p>
                                        <p>Sender: {c.sender}</p>
                                    </div>
                                ))}
                                <input name="message" type="text" className="form-control" onChange={this.handleChange} value={this.state.message}></input>
                                <button type="button" onClick={this.messageUser} className="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SendMessage;
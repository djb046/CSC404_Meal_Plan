import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';


class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.changeInput = this.changeInput.bind(this);
        this.state = {
            gender: ''
        };
    }
    changeInput(e) {
        let id = e.target.id;
        let value = e.target.value;
        this.setState({
            [id] : value
        });
    }
    submit() {
        var self = this;
        axios({
            method: 'post',
            url: '/submitSurvey',
            data: { 
                data: self.gender
            }
          });
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input id='gender' fluid label='Gender' placeholder='Read only' onChange={this.changeInput}/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Height' placeholder='Read only' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Weight' placeholder='Read only' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Age' placeholder='Read only' />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Allergies' placeholder='Read only' />
                </Form.Group>
                <Button basic color='green' onClick={this.submit} >Two</Button>
            </Form>
        )
    }
}

ReactDOM.render(<Survey />, document.getElementById('survey'));
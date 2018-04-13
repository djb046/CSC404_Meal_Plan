import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';


class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.changeInput = this.changeInput.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            gender: '',
            height: '',
            weight: '',
            age: '',
            allergies: '',
            activityLevel: 'potato'

        };
    }
    changeInput(e) {
        var id = e.target.id;
        var value = e.target.value;
        this.setState({
            [id] : value
        });
    }
    submit() {
    
        axios({
            method: 'post',
            url: '/survey/submit',
            data: {
                gender: this.state.gender,
                height: this.state.height,
                weight: this.state.weight,
                age: this.state.age,
                allergies: this.state.allergies,
                activityLevel: this.state.activityLevel
    
            }
          }).then(function (response) {
            window.loaction = window.loaction.origin + '/dashboard';
          })
          .catch(function (error) {
            console.log(error);
          });;
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input id='gender' fluid label='Gender' placeholder='Read only' onChange={this.changeInput}/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input id='height' fluid label='Height' placeholder='Read only' onChange={this.changeInput}/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input id='weight' fluid label='Weight' placeholder='Read only' onChange={this.changeInput}/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input id='age' fluid label='Age' placeholder='Read only' onChange={this.changeInput}/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input id='allergies' fluid label='Allergies' placeholder='Read only' onChange={this.changeInput}/>
                </Form.Group>
                <Button basic color='green' onClick={this.submit} >Two</Button>
            </Form>
        )
    }
}

ReactDOM.render(<Survey />, document.getElementById('survey'));
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Dropdown, Container } from 'semantic-ui-react';
import axios from 'axios';
import NavBar from './navBar.jsx';


class Create extends React.Component {
    constructor(props) {
        super(props);
        this.changeInput = this.changeInput.bind(this);
        this.submit = this.submit.bind(this);
        this.select = this.select.bind(this);
        this.state = {
            goal: '',
            actLevel: ''

        };
    }
    changeInput(e) {
        let id = e.target.id;
        let value = e.target.value;
        this.setState({
            [id]: value
        });
    }
    select(e, data) {
        let value = data.value;
        let id = data.id;
        this.setState({
            [id]: value
        });
        
    }
    submit() {

        axios({
            method: 'post',
            url: '/generateMealPlan/submit',
            data: {
                goal: this.state.goal,
                activityLevel: this.state.actLevel
            }
        }).then(function (response) {
            console.log(response);
            location.href = '/dashboard';
        })
            .catch(function (error) {
                console.log(error);
            });;
    }

    render() {
        const goalOpts = [
            { text: 'Weight Loss', value: 'Weight Loss' }, { text: 'Weight Gain', value: 'Weight Gain' }, { text: 'Weight Maintain', value: 'Weight Maintain' }
        ]
        const activityLevelOpts = [
            { text: 'Sedentary (little or no exercise)', value: 'Sedentary' }, { text: 'Lightly active (light exercise/sports 1-3 days/week)', value: 'Lightly active' }, { text: 'Moderately active (moderate exercise/sports 3-5 days/week)', value: 'Moderately active' }, { text: 'Very active (hard exercise/sports 6-7 days a week)', value: 'Very active' }, { text: 'Extra active (very hard exercise/sports & physical job or 2x training)', value: 'Extra active' }
        ]

        return (
            <Container fluid>
            <NavBar></NavBar>
            <Form>
                <Form.Group widths='equal'>
                    <Dropdown id='goal' placeholder='Select Goal' fluid selection options={goalOpts} onChange={this.select} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Dropdown id='actLevel' placeholder='Select Activity Level' fluid selection options={activityLevelOpts} onChange={this.select} />
                </Form.Group>
                <Button basic color='green' onClick={this.submit} >Submit</Button>
            </Form>
            </Container>
        )
    }
}

ReactDOM.render(<Create />, document.getElementById('dashboard'));
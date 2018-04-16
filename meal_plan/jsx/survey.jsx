import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Container } from 'semantic-ui-react';
import axios from 'axios';
import NavBar from './navBar.jsx';


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
            activityLevel: ''

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
            console.log(response);
            location.href = '/dashboard';
          })
          .catch(function (error) {
            console.log(error);
          });
    }



    render() {
        const options = [
            { key: 'None', text: 'None', value: 'none' },
            { key: 'Tree nut', text: 'Tree nut allergy', value: 'Tree nut' },
            { key: 'Wheat', text: 'Wheat allergy', value: 'Wheat' },
            { key: 'Milk', text: 'Milk allergy', value: 'Milk' },
            { key: 'Peanut', text: 'Peanut allergy', value: 'Peanut' },
            { key: 'Egg', text: 'Egg allergy', value: 'Egg' },
            { key: 'Soy', text: 'Soy allergy', value: 'Soy' },
            { key: 'Alpha-gal', text: 'Alpha-gal allergy', value: 'Alpha-gal' },
            { key: 'Corn', text: 'Corn allergy', value: 'Corn' },
            { key: 'Fruit', text: 'Fruit allergy', value: 'Fruit' },
            { key: 'Garlic', text: 'Garlic allergy', value: 'Garlic' },
          ]
          const activityLevelOpts = [
            { text: 'Sedentary (little or no exercise)', value: '1.2' }, 
            { text: 'Lightly active (light exercise/sports 1-3 days/week)', value: '1.375' }, 
            { text: 'Moderately active (moderate exercise/sports 3-5 days/week)', value: '1.55' }, 
            { text: 'Very active (hard exercise/sports 6-7 days a week)', value: '1.725' }, 
            { text: 'Extra active (very hard exercise/sports & physical job or 2x training)', value: '1.9' }
        ]
        return (
            <Container fluid>
            <Form>
                <NavBar></NavBar>
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
                {/* <Form.Group widths='equal'>
                    <Form.Dropdown id='activityLevel' placeholder='Select Activity Level' fluid selection options={activityLevelOpts} onChange={this.changeInput} />
                </Form.Group> */}
                <Form.Group widths='equal'>
                    <Form.Dropdown id='allergies' fluid label="Allergy" placeholder='None' fluid multiple selection options={options} onChange={this.changeInput}/>
                    {/* <Form.Input id='allergies' fluid label='allergies' placeholder='Read only' onChange={this.changeInput}/> */}
                </Form.Group>
                <Button basic color='green' onClick={this.submit} >Submit</Button>
            </Form>
            </Container>
        )
    }
}

ReactDOM.render(<Survey />, document.getElementById('dashboard'));
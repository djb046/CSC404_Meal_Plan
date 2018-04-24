import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Container, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import NavBar from './navBar.jsx';
//branch

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
            { key: 'Tree nut', text: 'Tree nut', value: 'Tree nut' },
            { key: 'Wheat', text: 'Wheat', value: 'Wheat' },
            { key: 'Milk', text: 'Milk', value: 'Milk' },
            { key: 'Peanut', text: 'Peanut', value: 'Peanut' },
            { key: 'Egg', text: 'Egg', value: 'Egg' },
            { key: 'Soy', text: 'Soy', value: 'Soy' },
            { key: 'Alpha-gal', text: 'Alpha-gal', value: 'Alpha-gal' },
            { key: 'Corn', text: 'Corn', value: 'Corn' },
            { key: 'Fruit', text: 'Fruit', value: 'Fruit' },
            { key: 'Garlic', text: 'Garlic', value: 'Garlic' },
          ]
          const activityLevelOpts = [
            { text: 'Sedentary (little or no exercise)', value: '1.2' }, 
            { text: 'Lightly active (light exercise/sports 1-3 days/week)', value: '1.375' }, 
            { text: 'Moderately active (moderate exercise/sports 3-5 days/week)', value: '1.55' }, 
            { text: 'Very active (hard exercise/sports 6-7 days a week)', value: '1.725' }, 
            { text: 'Extra active (very hard exercise/sports & physical job or 2x training)', value: '1.9' }
        ]
        const genderoptions = [
            { text: 'Male', value: 'Male'},
            { text: 'Female', value: 'Female'}
        ]
        return (
            <Container fluid>
            <Form>
                <NavBar></NavBar>
                {/* <Form.Group widths='equal'>
                    <Form.Input id='gender' fluid label='Gender' placeholder='Read only' onChange={this.changeInput} width={6}/>
                </Form.Group> */}
                <Form.Group widths='equal'>
                    <Dropdown id='gender' placeholder='Select Goal' fluid selection options={genderoptions} onChange={this.changeInput} />
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
                    <Form.Dropdown id='activityLevel' fluid label='Activity Level' placeholder='Select Activity Level' fluid selection options={activityLevelOpts} onChange={this.changeInput} />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Dropdown id='allergies' fluid label="Allergy" placeholder='None' fluid multiple selection options={options} onChange={this.changeInput}/>
                    {/* <Form.Input id='allergies' fluid label='allergies' placeholder='Read only' onChange={this.changeInput}/> */}
                </Form.Group>
                <Button basic color='green' onClick={this.submit} >Submit</Button>
            </Form>
            </Container>
        )
    }
}

ReactDOM.render(<Survey />, document.getElementById('dashboard'));
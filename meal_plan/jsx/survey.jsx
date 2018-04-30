import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Container, Dropdown, Input, Grid, Radio, Icon } from 'semantic-ui-react';
import axios from 'axios';
import NavBar from './navBar.jsx';


class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.changeInput = this.changeInput.bind(this);
        this.submit = this.submit.bind(this);
        this.select = this.select.bind(this)
        this.state = {
            gender: '',
            feet: '',
            inches:'',
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

        console.log(id + ":" + value);

        this.setState({
            [id] : value
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
        this.state.height = this.state.feet + "'" + this.state.inches + "''";
        console.log(this.state.height)
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
            <NavBar></NavBar>
            <Grid centered>
                <Grid.Column width={12}>
                    <Container className="dashPanel">
                        <div className="title">
                            <h1>Profile</h1>
                        </div>
                        
                        <Form>
                            <Form.Group widths='equal'>
                                <div className="ui center aligned">
                                <h3 className="title">Gender</h3>
                                <Dropdown fluid id='gender' placeholder='Select a Gender' label='Gender' fluid selection options={genderoptions} onChange={this.select} />
                                </div>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <div className="ui center aligned">
                                <h3 className="title">Height</h3>
                                <h4 className="title">Feet</h4>
                                <Button.Group>
                                  <Button icon id='feet' content='4' value='4' onClick={this.changeInput}/>
                                  <Button icon id='feet' content='5' value='5' onClick={this.changeInput}/>
                                  <Button icon id='feet' content='6' value='6' onClick={this.changeInput}/>
                                </Button.Group>
                                <h4 className="title">Inches</h4>
                                <Button.Group>
                                  <Button icon id='inches' content='0' value='0' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='1' value='1' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='2' value='2' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='3' value='3' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='4' value='4' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='5' value='5' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='6' value='6' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='7' value='7' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='8' value='8' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='9' value='9' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='10' value='10' onClick={this.changeInput}/>
                                  <Button icon id='inches' content='11' value='11' onClick={this.changeInput}/>
                                </Button.Group>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div className="ui center aligned">
                                <h3 className="title">Weight</h3>
                                <Input fluid id='weight' label={{ basic: true, content: 'lbs' }}
                                    labelPosition='right' placeholder='Read only' onChange={this.changeInput}/>
                                </div>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <div className="ui center aligned">
                                <h3 className="title">Age</h3>
                                <Input fluid id='age' placeholder='Read only' onChange={this.changeInput}/>
                                </div>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <div className="ui center aligned">
                                <h3 className="title">Activity Level</h3>
                                <Dropdown fluid id='activityLevel' label='Activity Level' placeholder='Select Activity Level' fluid selection options={activityLevelOpts} onChange={this.select} />
                                </div>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <div className="ui center aligned">
                                <h3 className="title">Allergies</h3>
                                <Dropdown fluid id='allergies' label="Allergy" placeholder='None' fluid multiple selection options={options} onChange={this.select}/>
                                </div>
                            </Form.Group>
                            <div className="ui center aligned">
                            <Button color='orange' onClick={this.submit} >Submit</Button>
                            </div>
                        </Form>
                        
                    </Container>
                </Grid.Column>
            </Grid>
            </Container>
            
        )
    }
}

ReactDOM.render(<Survey />, document.getElementById('dashboard'));
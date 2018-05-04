import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Dropdown, Container, Segment } from 'semantic-ui-react';
import axios from 'axios';


class NuteLabel extends React.Component {
    constructor(props) {
        super(props);
        this.changeInput = this.changeInput.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            foodQuery: '',
        };
    }
    changeInput(e) {
        let id = e.target.id;
        let value = e.target.value;
        this.setState({
            [id]: value
        });
    }
    submit() {
        axios({
            method: 'post',
            headers: {
                "x-app-id": 'b5e0352f',
                "x-app-key": '9d811ca9f553eb1a1a121d026d19b094',
                "Content-Type": "application/json"
            },
            url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
            data: {
                "query": this.state.foodQuery,
                "timezone": "US/Eastern"
            }
        }).then(function (res) {
            console.log(res);
            let food_name = '', nf_calories = 0, nf_total_fat = 0, nf_saturated_fat = 0, nf_cholesterol = 0, nf_sodium = 0, nf_total_carbohydrate = 0, nf_sugars = 0, nf_protein = 0;
            for(var i = 0; i < res.data.foods.length; i++) {
                food_name += res.data.foods[i].food_name + ', '
                nf_calories = nf_calories + res.data.foods[i].nf_calories
                nf_total_fat = nf_total_fat + res.data.foods[i].nf_total_fat
                nf_saturated_fat = nf_saturated_fat + res.data.foods[i].nf_saturated_fat
                nf_cholesterol = nf_cholesterol + res.data.foods[i].nf_cholesterol
                nf_sodium = nf_sodium + res.data.foods[i].nf_sodium
                nf_total_carbohydrate = nf_total_carbohydrate + res.data.foods[i].nf_total_carbohydrate
                nf_sugars = nf_sugars + res.data.foods[i].nf_sugars
                nf_protein = nf_protein + res.data.foods[i].nf_protein
            }
            console.log(food_name, nf_calories, nf_total_fat, nf_saturated_fat, nf_cholesterol, nf_sodium, nf_total_carbohydrate, nf_sugars,nf_protein)
            var label = res.data.foods[0];
            $('#test1').nutritionLabel({
                'scrollHeightPixel': 200,
                'scrollLongIngredients': true,
                'showItemName': false,
                'showServingsPerContainer': true,

                'showPolyFat': false,
                'showMonoFat': false,
                'showTransFat': false,
                'showFibers': false,
                'showVitaminA': false,
                'showVitaminC': false,
                'showCalcium': false,
                'showIron': false,

                'valueServingUnitQuantity': 1,
                'valueServingSizeUnit': food_name,

                'valueCalories': nf_calories,
                'valueTotalFat': nf_total_fat,
                'valueSatFat': nf_saturated_fat,
                'valueCholesterol': nf_cholesterol,
                'valueSodium': nf_sodium,
                'valueTotalCarb': nf_total_carbohydrate,
                'valueSugars': nf_sugars,
                'valueProteins': nf_protein
            });
        }).catch(function (error) {
            console.log(error);
        });

    }

    render() {

        return (
            <Container fluid>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input id='foodQuery' placeholder='What did you eat?' onChange={this.changeInput} />
                    </Form.Group>
                    {/* <Segment id='test1'></Segment> */}
                    <Button basic color='green' onClick={this.submit} >Submit</Button>
                </Form>
                <Segment id="test1" />
            </Container>
        )
    }
}

ReactDOM.render(<NuteLabel />, document.getElementById('dashboard'));

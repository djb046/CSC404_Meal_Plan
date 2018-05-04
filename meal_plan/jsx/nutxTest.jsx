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
        }).then(function (response) {

            console.log(response);
            var label = response.data.foods[0];
            $('#test1').nutritionLabel({
                'scrollHeightPixel': 200,
                'scrollLongIngredients': true,
                'showItemName': false,
                'showServingsPerContainer': true,
                'ingredientList': 'Enriched Bleached Wheat Flour (Bleached Flour, Malted Barley Flour, Niacin, Iron, Thiamin Mononitrate, Riboflavin, Folic Acid), Sugar, Vegetable Oil (contains one or more of the following oils: Cottonseed Oil, Palm Oil, Soybean Oil), Water, Hydrogenated Vegetable Oil (Palm Kernel Oil, Palm Oil), High Fructose Corn Syrup, Cocoa Powder (Processed With Alkali), contains 2% or less of the following: Eggs, Nonfat Milk, Glycerin, Soy Flour, Corn Syrup Solids, Leavening (Sodium Acid Pyrophosphate, Baking Soda, Sodium Aluminum Phosphate), Preservatives (Potassium Sorbate, Sodium Propionate, Calcium Propionate), Salt, Distilled Monoglycerides, Dextrose, Food Starch-Modified (Corn and/or Wheat), Soy, Lecithin, Natural and Artificial Flavor, Mono- and Diglycerides, Spices, Tapioca Starch, Wheat Starch, Cellulose Gum, Guar Gum, Karaya Gum, colored with Extracts of Annatto and Turmeric, Artificial Color.',

                'showPolyFat': false,
                'showMonoFat': false,
                'showTransFat': false,
                'showFibers': false,
                'showVitaminA': false,
                'showVitaminC': false,
                'showCalcium': false,
                'showIron': false,

                'valueServingUnitQuantity': 1,
                'valueServingSizeUnit': label.food_name,

                'valueCalories': label.nf_calories,
                'valueFatCalories': 220,
                'valueTotalFat': label.nf_total_fat,
                'valueSatFat': label.nf_saturated_fat,
                'valueCholesterol': label.nf_cholesterol,
                'valueSodium': label.nf_sodium,
                'valueTotalCarb': label.nf_total_carbohydrate,
                'valueSugars': label.nf_sugars,
                'valueProteins': label.nf_protein
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
                        <Form.Input id='foodQuery' placeholder='whatcha eat?' onChange={this.changeInput} />
                    </Form.Group>
                    <Segment id='test1'></Segment>
                    <Button basic color='green' onClick={this.submit} >Submit</Button>
                </Form>
            </Container>
        )
    }
}

export default NuteLabel;
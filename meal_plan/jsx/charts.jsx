import { Chart } from 'react-google-charts';
import React from 'react';
import axios from 'axios';
 

class Charts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: "Today's Meals Ratio",
        pieSliceText: 'label',
        legend: 'true',
        backgroundColor: { fill:'transparent' },
        colors: ['#e0440e', '#e6693e', '#ec8f6e']
      },
      data: [['Macro','Nutrients'],
          ['Fat',  0],
          ['Protein',  0],
          ['Carbs',  0],
      ],
    };
  }

  componentDidMount() {
  var _this = this;
  axios.post('/viewMealPlan/view')
.then(function(response)
{
 console.log(response);
 _this.setState({
  data: [['Macro','Nutrients'],
          ['Fat',  parseInt(response.data.breakfast.Fat + response.data.lunch.Fat + response.data.dinner.Fat)],
          ['Protein',  parseInt(response.data.breakfast.Protein + response.data.lunch.Protein + response.data.dinner.Protein)],
          ['Carbs',  parseInt(response.data.breakfast.Carbs + response.data.lunch.Carbs + response.data.dinner.Carbs)],
      ], 
});
console.log(response.data);
});
}


  render() {

    return (
      <Chart
        chartType="PieChart"
        data={this.state.data}
        options={this.state.options}
        graph_id="PieChart"
        width="100%"
        height="400px"
        
      />
    );
  }
}
export default Charts;
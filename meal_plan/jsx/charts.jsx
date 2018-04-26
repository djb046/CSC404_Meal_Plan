import { Chart } from 'react-google-charts';
import React from 'react';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Performance',
        hAxis: { title: 'Time', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Calories', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      data: [
        ['Day', 'Eaten', 'Expended'],
          ['Monday',  1000,      400],
          ['Tuesday',  1170,      460],
          ['Wednesday',  660,       1120],
          ['Thursday',  1030,      540],
          ['Friday',  1200,      600],
          ['Saturday',  1000,      100],
          ['Sunday',  1110,      200],
      ],
    };
  }
  render() {
    return (
      <Chart
        chartType="LineChart"
        data={this.state.data}
        options={this.state.options}
        graph_id="LineChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    );
  }
}
export default Charts;
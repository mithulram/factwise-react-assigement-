import React, { useContext } from "react";
import { Context } from "../Context.js"
import { Pie } from "react-chartjs-2";

class PieChart extends React.Component {

  //use context to get the color values from context.js
  static contextType = Context;

  render() {

    /* 
   data: An Array of two numbers 
   [no. of people vaccinated, no. of people not vaccinated]
 */
    const color1 = this.context[0];
    const color2 = this.context[1];
    const options = {
      labels: ["Vaccinated", "Not Vaccinated"],
      datasets: [
        {
          label: "My First Dataset",
          data: this.props.data,
          backgroundColor: [color1, color2],
          hoverOffset: 4
        }
      ],
      height: "50%"
    };
    return <Pie data={options} />;

  }

}

export default PieChart;

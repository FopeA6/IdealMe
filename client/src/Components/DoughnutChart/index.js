import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class DoughnutChart extends Component {

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom",
  };




  render() {
    return (
      <div className="chart">
        <Doughnut
          data={this.props.chartdata}
          // width={100}
          // height={50}
          options={{
            // maintainAspectRatio: false
            title: {
              display: this.props.displayTitle,
              text: "Nutritional breakdown",
              fontSize: 32,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
              labels: {
                fontSize: 20,
            }
            },
          }}
        />
      </div>
    );
  }
}

export default DoughnutChart;

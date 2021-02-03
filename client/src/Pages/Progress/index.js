import React from 'react';
import { Line } from "react-chartjs-2";

class Progress extends React.Component {

    state = {
        chartdata: {},
        caloriesdata: {}
    }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom",
  };
  


  componentDidMount(){
      this.fetchData();
  }

  fetchData = async()=>{
      const resp = await fetch(`http://localhost:5000/progress/${this.props.user.userId}`)
      const data = await resp.json();
      if(data.err){
          throw Error(data.err);
      }
      let allWeight = []
      let allDates = []
      let allCalories = []
      let totalCalories= []

      let spreadData = data.map(w => {
            allWeight.push(w[0])
            allDates.push(w[1])
            allCalories.push(w[2])
            totalCalories.push(w[3])
      })
      
      this.setState({
        chartdata: {
          labels: [...allDates],
          datasets: [
            {
              label: "Gramms",
              data: [...allWeight],
              backgroundColor: [
                "rgba(34,255,255,0.6)"
              ],
            },
          ],
        },
        caloriesdata: {
          labels: [...allDates],
          datasets: [
            {
              label: "Calories Consumed",
              data: [...allCalories],
              backgroundColor: [
                "rgba(34,255,255,0.9)"
              ],
            },
            {
              label: "Calories Goal",
              data: [...totalCalories],
              backgroundColor: [
                "rgba(255,25,55,0.35)"
              ],
            },
          ],
        },
      });
  }

  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.caloriesdata}
          // width={100}
          // height={50}
          options={{
            // maintainAspectRatio: false
            title: {
              display: this.props.displayTitle,
              text: "Calories Consumed breakdown",
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      min: 0,
                      max: 5000    
                  }
                }]
             }
          }}
        />
        <Line
          data={this.state.chartdata}
          // width={100}
          // height={50}
          options={{
            // maintainAspectRatio: false
            title: {
              display: this.props.displayTitle,
              text: "Nutritional breakdown",
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      min: 0,
                      max: 200    
                  }
                }]
             }
          }}
        />
      </div>
    );
  }
}


export default Progress
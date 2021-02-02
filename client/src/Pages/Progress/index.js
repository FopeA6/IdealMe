import React from 'react';
import { Line } from "react-chartjs-2";

class Progress extends React.Component {

    state = {
        chartdata: {}
    }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom",
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                min: 0,
                max: 200    
            }
          }]
       }
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
    //   this.setState({
    //       progressData: data
    //   })
      let allWeight = []
      let allDates = []

      let spreadData = data.map(w => {
            allWeight.push(w[0])
            allDates.push(w[1])
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
      });
  }

  render() {
      console.log(this.state.chartdata)
    return (
      <div className="chart">
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
          }}
        />
      </div>
    );
  }
}


export default Progress
import React, { Component } from "react";
import DoughnutChart from "../../Components/DoughnutChart";
import DailyCalories from "../../Components/DailyCalories";
import NewDayBtn from "../../Components/NewDayBtn";
import './style.css'

class Calories extends Component {
  state = {
    data: [],
    search: "",
    foodData: [],
    totalCal: 0,
    uptoDate: true,
    chartData: {},
    newUser: false,
  };

  componentDidMount() {
    this.fetchCalories();
  }

  fetchCalories = async () => {
    const resp = await fetch(
      `http://localhost:5000/details/${this.props.user.name}`
    );
    const data = await resp.json();
    if (data.err) {
      this.setState({ newUser: true });
      throw Error(data.err);
    }

    const today = new Date();
    const currentDate = new Intl.DateTimeFormat("en-Uk", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(today);

    if (data[0].today == currentDate) {
      this.setState({ data: data, uptoDate: true });
    } else this.setState({ uptoDate: false, data: data });
  };

  calculateBMI = (weight, height) => {
    const weightKG = Math.round(weight / 2.205);
    const heightM = Math.round(height / 39.37);
    const bmi = weightKG / (heightM * heightM);
    return bmi;
  };

  updateSearch = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${this.state.search}`,
      { method: "GET", headers: { "X-Api-Key": process.env.YOUR_API_KEY } }
    );
    const data = await response.json();

    this.setState({
      foodData: data.items,
    });
    this.addTotal(data.items);
    this.setState({
      search: "",
    });
  };

  addTotal = (data) => {
    const allcalories = data.map((i) => i.calories);
    const allcarb = data.map((i) => i.carbohydrates_total_g);
    const allprotein = data.map((i) => i.protein_g);
    const allfat = data.map((i) => i.fat_total_g);
    let totalcalories = allcalories.reduce((a, b) => a + b);
    let totalcarb = allcarb.reduce((a, b) => a + b);
    let totalprotein = allprotein.reduce((a, b) => a + b);
    let totalfat = allfat.reduce((a, b) => a + b);
    this.setState({
      totalCal: totalcalories,
    });

    this.setState({
      chartData: {
        labels: ["Total Carbohydrates", "Total Protein", "Total Fat"],
        datasets: [
          {
            label: "Gramms",
            
            data: [totalcarb, totalprotein, totalfat],
            backgroundColor: [
              "rgba(255,25,55,0.6)",
              "rgba(255,56,255,0.6)",
              "rgba(34,255,255,0.6)",
            ],
          },
        ],
      },
    });
  };

  render() {
    let data = this.state.data.map((d, i) => {
      return (
        <DailyCalories
          key={i}
          BMI={this.calculateBMI(d.myWeight, d.myHeight)}
          intake={d.caloriesGoal}
          consumed={d.caloriesConsumed}
          user={d.userId}
          fetchCalories={this.fetchCalories}
        />
      );
    });

    const renderCalories = this.state.foodData.map((p, idx) => {
      return (
        <tr key={idx}>
            <td>{p.name}</td>
            <td>{p.calories}</td>
            <td>{p.carbohydrates_total_g}g</td>
            <td>{p.protein_g}g</td>
            <td>{p.fat_total_g}g</td>
            <td>{p.serving_size_g}g</td>
          </tr>
      );
    });

    //calculate bmi, average calories consumption, search api, add today btn
    return (
      <div>
        <h1> Tracking your daily calories! </h1>
        {this.state.newUser ? (
          <p>Please head over to Details page and enter your details</p>
        ) : this.state.uptoDate ? (
          data[0]
        ) : (
          <NewDayBtn
            data={this.state.data[0]}
            fetchCalories={this.fetchCalories}
            user={this.props.user.userId}
          />
        )}

        <div>
          <h2>What did you eat?</h2>
          <p>
            Enter the food you had here and we tell you how much calories you
            had.
          </p>
          <div className="container">
          <form className="search-form" onSubmit={this.getSearch}>
            <input
              className="search-bar"
              name="search"
              value={this.state.search}
              onChange={this.updateSearch}
              type="text"
              placeholder="E.g. one apple and peanut butter"
            />
            <input className="search-button" type="submit" value="Search" />
          </form>
          </div>
          <div>
            <h2>Your food has the following nutritional value:</h2>
            <p>Total calories: {this.state.totalCal}</p>
            <DoughnutChart chartdata={this.state.chartData} />

            <table>
              <caption>Nutritional Values</caption>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Total calories</th>
                  <th>Carbs</th>
                  <th>Protein</th>
                  <th>Fat</th>
                  <th>Serving size</th>
                </tr>
              </thead>
              <tbody>{renderCalories}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default Calories;

// calories: 126.7
// carbohydrates_total_g: 28.6
// cholesterol_mg: 0
// fat_saturated_g: 0.1
// fat_total_g: 0.5
// fiber_g: 4
// name: "onion"
// potassium_mg: 99
// protein_g: 3.9
// serving_size_g: 283.495
// sodium_mg: 8
// sugar_g: 13.3

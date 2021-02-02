import React, {useEffect, useState} from 'react';

class Calories extends Component {

    state = {
        data: [],
        search: "",
        foodData: [],
        totalCal: 0,
        uptoDate: true
    }

    componentDidMount(){
        this.fetchCalories();
    }

    fetchCalories = async () => {
        const resp = await fetch(`http://localhost:5000/details/${this.props.user.name}`);
        const data = await resp.json();
        if(data.err){ throw Error(data.err) }
        
        const today = new Date()
        const currentDate = new Intl.DateTimeFormat('en-Uk', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today);
        
        console.log(data[0].today == "31-01-2021")
        if(data[0].today == currentDate){
            this.setState({ data })
        }else(
            this.setState({ uptoDate : false, data: data })
        )
    }

    calculateBMI = (weight, height) => {
        const weightKG = Math.round(weight / 2.205);
        const heightM = Math.round(height / 39.37)
        const bmi = weightKG / (heightM * heightM)
        return bmi
    }

    updateSearch = e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    getSearch = async e => {
        e.preventDefault();
        const response= await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${this.state.search}`, 
            { method: "GET", headers: {'X-Api-Key': process.env.YOUR_API_KEY}})
        const data = await response.json();
        
        this.setState({
            foodData: data.items
        })
        this.addTotal(data.items)
        this.setState({
            search: ""
        })
    }

    addTotal = (data) => {
        const alldata = data.map(i => i.calories)
        let total = alldata.reduce((a, b) => a + b)
        this.setState({
            totalCal: total
        })
    }

    addCalories = async(e, user) => {
        e.preventDefault();
        const today = new Date()
        const currentDate = new Intl.DateTimeFormat('en-Uk', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today);
        
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                caloriesConsumed: e.target.caloriesValue,
                today: currentDate,
                userId: user
            })
        }

        const sendData = await fetch(`http://localhost:5000/update-count`, options);
        const res = await sendData.json();
        if(res.err){ throw Error(res.err) }
        this.fetchCalories();
    }

    render() {
        const data = this.state.data.map((d,i) => {
            if(this.state.uptoDate){
                return (
                    <div key={i}>
                        <p>BMI: {this.calculateBMI(d.myWeight, d.myHeight)}</p>
                        <p>Daily Calories Intake: {d.caloriesGoal}</p>
                        <p>Calories Consumed: {d.caloriesConsumed}</p>
                        <form onSubmit={(e)=> this.addCalories(e, d.userId)}>
                            <label htmlFor="adding">Add calories</label>
                            <input type="number" step=".01" name="caloriesValue"/>
                            <input type="submit" value="add calories"/>
                        </form>
                    </div>
                )
            }else{
                return (
                    <div key={i}>
                        <p>Welcome do you want to start todays count?</p>
                    </div>
                )
            }
        })

        const renderCalories = this.state.foodData.map((p, idx) => {
            return (<div key={idx}>
                <p>Name: {p.name}</p>
                <p>Total calories: {p.calories}</p>
                <p>Carbohydrates: {p.carbohydrates_total_g} g</p>
                <p>Protein: {p.protein_g} g</p>
                <p>Fat: {p.fat_total_g} g</p>
                <p>Serving size: {p.serving_size_g} g</p>
            </div>)
        })
        
        //calculate bmi, average calories consumption, search api, add today btn
        return (
            <div>
                <h1> Hello to calories page! </h1>
                {data[0]}

                <div>
                    <h2>What did you eat?</h2>
                    <p>Enter the food you had her and we tell you how much calories you had.</p>
                    <form className= "search-form" onSubmit={this.getSearch}>
                        <input className="search-bar" name="search" value={this.state.search} onChange={this.updateSearch} type="text"/>
                        <input className="search-button" type="submit" value="Search" />
                    </form>
                    <div>
                        <h3>Your food has the following nutritional value:</h3>
                        <p>Total calories: {this.state.totalCal}</p>
                        {renderCalories}
                    </div>
                </div>
            </div>
        )
        }
}
export default App;


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

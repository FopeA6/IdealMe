import React, { Component } from 'react';
import DailyCalories from '../../Components/DailyCalories';
import NewDayBtn from '../../Components/NewDayBtn';

class Calories extends Component {

    state = {
        data: [],
        search: "",
        foodData: [],
        totalCal: 0,
        uptoDate: true,
        newUser: false
    }

    componentDidMount(){
        this.fetchCalories();
    }

    fetchCalories = async () => {
        const resp = await fetch(`http://localhost:5000/details/${this.props.user.name}`);
        const data = await resp.json();
        if(data.err){ 
            this.setState({ newUser: true })
            throw Error(data.err) 
        }
        
        const today = new Date()
        const currentDate = new Intl.DateTimeFormat('en-Uk', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today);
        
        //console.log(currentDate == "02/02/2021")
        //console.log(data[0].today == "31-01-2021")
        if(data[0].today == currentDate){
            this.setState({ data: data, uptoDate: true })
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


    render() {
        let data = this.state.data.map((d,i) => {
                    return(
                        <DailyCalories 
                            key={i} 
                            BMI={this.calculateBMI(d.myWeight, d.myHeight)} 
                            intake={d.caloriesGoal} 
                            consumed={d.caloriesConsumed}
                            user={d.userId} 
                            fetchCalories={this.fetchCalories}
                        />
                    )
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
                {this.state.newUser ? 
                    <p>Please head over to Details page and enter your details</p> : 
                    (this.state.uptoDate ? 
                        data[0] : 
                        <NewDayBtn data={this.state.data[0]} fetchCalories={this.fetchCalories} user={this.props.user.userId}/>
                    )
                }

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

export default Calories
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';

class Userdetails extends Component {
    state = {
        data: []
    }

    componentDidMount(){
        this.fetchDetails();
    }

    fetchDetails = async ()=>{
        const resp = await fetch(`http://localhost:5000/details/${this.props.user.name}`)
        const data = await resp.json()
        if(data.err){ throw Error(data.err) }
        this.setState({ data })
    }

    addDetails = async (e)=> {
        e.preventDefault();
        const today = new Date()
        
        const currentDate = new Intl.DateTimeFormat('en-Uk', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today);
        
        const caloriesG = await this.caloriesCalculator(e.target.height.value, 
            e.target.weight.value, 
            e.target.age.value,
            e.target.genderSelect.value,
            e.target.fitnesslist.value,
            e.target.caloriesGoal.value);
        
        //console.log(caloriesG)

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                height: e.target.height.value,
                weight: e.target.weight.value,
                age: e.target.age.value,
                fitness: e.target.fitnesslist.value,
                caloriesGoal: caloriesG,
                caloriesConsumed: 0,
                today: currentDate,
                userId: this.props.user.userId
            })
        }
        const sendData = await fetch(`http://localhost:5000/new-details`, options);
        const res = await sendData.json();
        if(res.err){ throw Error(res.err) }
        this.props.history.push('/calories');
    }

    caloriesCalculator = (height, weight, age, gender, fitness, goal) =>{
        let BMR
        let calories;
        let weightMeasure = {
            male: {
                maintain: 1,
                mild: 0.88,
                weight: 0.77,
                extream: 0.54
            },
            female: {
                maintain: 1,
                mild: 0.87,
                weight: 0.75,
                extream: 0.49
            }
        }
        if(gender == 'male'){
            BMR = 66 + (6.3 * weight) + (12.9 * height) - (6.8 * age);
        }else {
            BMR = 655 + (4.3 * weight) + (4.7 * height) - (4.7 * age);
        }

        switch(fitness){
            case "Not Active":
                calories = BMR * 1.2 * weightMeasure[gender][goal]
                break;
            case "Lite Activity":
                calories = BMR * 1.375 * weightMeasure[gender][goal]
                break;
            case "Moderate Active":
                calories = BMR * 1.55 * weightMeasure[gender][goal]
                break;
            case "Elite Activity":
                calories = BMR * 1.725 * weightMeasure[gender][goal]
                break;
        }
        return Math.round(calories);
    }

    render() {
        return (
            <section>
                <h1>View your details here</h1>
                <div className="container1">
                <form id="userDetails" onSubmit={this.addDetails}>
                    <div className="inputContainer">
                        <label htmlFor="height">Height in inches</label>
                        <input type="number" step=".01" name="height" placeholder="E.g. 70.1"/>
                    </div>
                    
                    <div className="inputContainer">
                        <label htmlFor="weight">Weight in lbs</label>
                        <input type="number" step=".01" name="weight" placeholder="E.g. 170.25"/>
                    </div>
                    
                    <div className="inputContainer">
                        <label htmlFor="age">Age</label>
                        <input type="number" name="age" placeholder="E.g. 25"/>
                    </div>
                    
                    <div className="inputContainer">
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" name="genderSelect">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                    </div>
                    
                    <div className="inputContainer">
                        <label htmlFor="fitness">Fitness Level:</label>
                        <select id="firness" name="fitnesslist">
                        <option value="Not Active">Not Active</option>
                        <option value="Lite Activity">Lite Activity</option>
                        <option value="Moderate Active">Moderate Active</option>
                        <option value="Elite Activity">Elite Activity</option>
                        </select>
                    </div>
                    
                    <div className="inputContainer">
                        <label htmlFor="goal">Calories Goal:</label>
                        <select id="goal" name="caloriesGoal">
                        <option value="maintain">Maintain weight</option>
                        <option value="mild">Mild weight loss</option>
                        <option value="weight">Weight loss</option>
                        <option value="extream">Extreme weight loss</option>
                        </select>
                    </div>

                    <input type="submit" value="add details" />
                </form>
                </div>
            </section>
        )
        }
}

export default withRouter(Userdetails)
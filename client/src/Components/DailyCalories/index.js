import React from 'react';

class DailyCalories extends React.Component{
    addCalories = async(e) => {
        e.preventDefault();
        const today = new Date()
        const currentDate = new Intl.DateTimeFormat('en-Uk', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today);
        
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                caloriesConsumed: e.target.caloriesValue.value,
                today: currentDate
            })
        }
        
        const sendData = await fetch(`http://localhost:5000/update-count/${this.props.user}`, options);
        const res = await sendData.json();
        if(res.err){ throw Error(res.err) }
        e.target.caloriesValue.value = "";
        this.props.fetchCalories();
    }
    render(){
        return(
            <div>
                <p>BMI: {this.props.BMI}</p>
                <p>Daily Calories Intake: {this.props.intake}</p>
                <p>Calories Consumed: {this.props.consumed}</p>
                <form onSubmit={(e)=> this.addCalories(e)}>
                    <label htmlFor="adding">Add calories</label>
                    <input type="number" step=".01" name="caloriesValue"/>
                    <input type="submit" value="add calories"/>
                </form>
            </div>
        )
    }
}


export default DailyCalories;
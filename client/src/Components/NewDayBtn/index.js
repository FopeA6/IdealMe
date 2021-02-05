import React from 'react';

class NewDayBtn extends React.Component {
    
    addNewDay = async()=>{
        const today = new Date()
        const currentDate = new Intl.DateTimeFormat('en-Uk', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today);
        
        const options ={
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                height: this.props.data.myHeight,
                weight: this.props.data.myWeight,
                age: this.props.data.age,
                fitness: this.props.data.fitnessLevel,
                caloriesGoal: this.props.data.caloriesGoal,
                caloriesConsumed: 0,
                today: currentDate,
                userId: this.props.user
            })
        }

        const sendData = await fetch(`https://idealme-server.herokuapp.com/new-details`, options);
        const res = await sendData.json();
        if(res.err){ throw Error(res.err) }
        this.props.fetchCalories();
    }
    render(){
        return(
            <div>
                <p>Welcome do you want to start todays count?</p>
                <button id="newday" onClick={this.addNewDay}>Yes!</button>
            </div>
        )
    }
}

export default NewDayBtn;
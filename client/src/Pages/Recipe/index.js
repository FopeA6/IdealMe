import React, { Component } from 'react';

class Recipe extends Component {
    key = process.env.RECIPE_KEY;

    render() {
        //console.log(process.env.RECIPE_KEY)
        return (
            <main>
                <h1> Hello to recipe page! </h1>
                {this.key}
            </main>

        )
        }
}

export default Recipe
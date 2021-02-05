import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Home, Calories, Userdetails, Recipe, Progress } from './pages';
import { NavBar, LoggedOutRoute, Register, PrivateRoute } from './components';
import Login from './components/Login';
import './App.css'

class App extends React.Component {
    state = {
      isLoggedIn: false, // must change back to false
      currentUser: {}
    }

    login = async (userData, creating) => {
      try {
          const options = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
          }
          const r = await fetch(`https://idealme-server.herokuapp.com/auth/login`, options)
          const data = await r.json();
          if (data.err){ throw Error(data.err) }
          this.setState({ isLoggedIn: true, currentUser: data })
          if(creating){
          this.props.history.push('./details')
          }else{
            this.props.history.push('./calories')
          }
      } catch (err) {
          console.warn(`Error: ${err}`);
      }
    }

    logout = () => {
      this.setState({ isLoggedIn: false })
      this.props.history.push('/')
    }

    render() {
      return (
        <main>
              <NavBar isLoggedIn={this.state.isLoggedIn} logout={this.logout} />
              
              <Switch id={"navPaths"}>
                  <Route exact path='/' component={()=> <Home login={this.login}/>} />
                  <LoggedOutRoute path='/login' isLoggedIn={this.state.isLoggedIn} component={()=> <Login login={this.login}/>} />
                  <LoggedOutRoute path='/register' isLoggedIn={this.state.isLoggedIn} component={Register} /> 
                  <PrivateRoute path='/calories' isLoggedIn={this.state.isLoggedIn} component={()=> <Calories user={this.state.currentUser}/>} />
                  <PrivateRoute path='/progress' isLoggedIn={this.state.isLoggedIn} component={()=> <Progress user={this.state.currentUser}/>} />
                  <PrivateRoute path='/details' isLoggedIn={this.state.isLoggedIn} component={()=> <Userdetails user={this.state.currentUser}/>} />
                  <PrivateRoute path='/recipe' isLoggedIn={this.state.isLoggedIn} component={() => <Recipe user={this.state.currentUser} />} />
              </Switch>
          </main>
      )
    }
  }

  export default withRouter(App);
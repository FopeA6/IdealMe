import React, { Component } from "react";
import { Login, Register } from "../../components";
import FetchQuote from "../../Components/FetchQuote";
import "./style.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
    };
  }

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }

  render() {
    return (
      <div>
        <div id="hometop" className="home">
          <div className="centered">
            <img
              className="apple"
              id="appleicon"
              src="https://iconfair.com/wp-content/uploads/2020/11/Artboard-23-4.png"
            ></img>
            <h1>Welcome to idealMe</h1>
            <p>
              Here to help you become the person you want to see in the mirror.
            </p>
            <FetchQuote />
          </div>
        </div>

        <div id="homebottom" className="home">
          <div className="centered">
            <div className="container">
              <div className="box-controller">
                <button
                  id="loginbtn"
                  className={
                    "controller " +
                    (this.state.isLoginOpen ? "selected-controller" : "")
                  }
                  onClick={this.showLoginBox.bind(this)}
                >
                  Login
                </button>

                <button
                  id="registerbtn"
                  className={
                    "controller " +
                    (this.state.isRegisterOpen ? "selected-controller" : "")
                  }
                  onClick={this.showRegisterBox.bind(this)}
                >
                  Register
                </button>
              </div>
              <div>
                {this.state.isLoginOpen ? (
                  <Login login={this.props.login} />
                ) : (
                  <Register login={this.props.login} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";
import "./App.css";
import SignUp from "./Screens/SignUp/SignUp";
import LogIn from "./Screens/LogIn/LogIn";
import QuizList from "./Screens/QuizList/QuizList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isUser: false,
      authForms: true
    };
    this.checkUser = this.checkUser.bind(this);
    this.toggleAuthForms = this.toggleAuthForms.bind(this);
    this.changeUserState = this.changeUserState.bind(this);
    this.logout = this.logout.bind(this);
  }

  checkUser() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo) {
      console.log("user is NOT logged in");
      this.setState({ isUser: false });
    } else {
      this.setState({ isUser: true });
      console.log(`${userInfo.username} is logged IN`);
    }
  }

  changeUserState() {
    this.setState({ isUser: true });
  }

  toggleAuthForms(Show_Hide) {
        this.setState({ authForms: Show_Hide });
  }

  logout() {
    this.setState({ isUser: false });
    sessionStorage.removeItem("userInfo");
  }

  componentDidMount() {
    this.checkUser();
  }

  render() {
    const { isUser, authForms } = this.state;
    return (
      <div className="container margin">
        {!isUser ? (
          authForms ? (
            <div>
              <SignUp toggleToSignIn={this.toggleAuthForms} />
              <br />
              <div class="container signin">
                <p>
                  Already have an account?{" "}
                  <a href="#" onClick={this.toggleAuthForms.bind(this, false)}>
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <LogIn changeUserState={this.changeUserState} />
              <br />
              <a href="#" onClick={this.toggleAuthForms.bind(this, true)}>
                SignUp <i />
              </a>
            </div>
          )
        ) : (
          <div>
            <br />
            <a href="#" onClick={this.logout}>
              Logout <i />
            </a>
            <QuizList />
          </div>
        )}
      </div>
    );
  }
}

export default App;

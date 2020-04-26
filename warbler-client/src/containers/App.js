import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "../store/index";
import Navbar from "./NavBar";
import Main from "./Main";
import jwtDecode from "jwt-decode";
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="onboarding">
          <Navbar />
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

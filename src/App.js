import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Nav";
import Auth from "./components/Auth";
import Post from "./components/Post";
import Form from "./components/Form";
import Welcome from "./components/Welcome";
import store from "./store";
import routes from "./routes";

function App() {
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <div className="App">App</div>
          <Nav />
          <Auth />
          <Dashboard />
          <Form />
          <Post />
          <Welcome name="Edson" />

          <Link to={`/login`}>
            {" "}
            <button className="buttonhome1">Login</button>{" "}
          </Link>

          {routes}
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../routers/Home";
import Room from "../routers/Room";
import Header from "./Header";
import GlobalStyle from "./GlobalStyle";
import Chat from "../routers/Chat";
import "../utils/socket";
//simport "../utils/peer";
function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/chat" component={Chat} />
        <Route path="/room/:roomId" component={Room} />
      </Switch>
    </Router>
  );
}

export default App;

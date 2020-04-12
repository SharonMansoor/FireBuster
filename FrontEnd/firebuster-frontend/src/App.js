import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "typeface-roboto";
import { AppBar, Toolbar, Tabs, Typography, Tab, Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReportWildFirePage from "./pages/ReportWildfirePage";
import StatisticsPage from "./pages/StatisticsPage";
import AlertsPage from "./pages/AlertsPage";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" style={{ marginRight: "30px" }}>
            Fire Buster
          </Typography>
          <Tabs>
            <Tab color="inherit" href={"/"} label='Alerts'/>
            <Tab color="inherit" href={"/ReportWildfire"} label="Report Wildfire" index={1} />
            <Tab color="inherit" href={"/Statistics"} label="Statistics" index={2} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/" component={AlertsPage} />
        <Route path="/ReportWildfire" component={ReportWildFirePage} />
        <Route path="/Statistics" component={StatisticsPage} />
      </Switch>
    </Router>
  );
}

export default App;

import React from "react";
import "./App.css";
import "typeface-roboto";
import { AppBar, Toolbar, Typography, ThemeProvider, Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReportWildFirePage from "./pages/ReportWildfirePage";
import StatisticsPage from "./pages/StatisticsPage";
import AlertsPage from "./pages/AlertsPage";
import theme from "./Theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <AppBar position="static">
        <Toolbar>
          <img src='images\Icon.png' alt='' style={{height: '60px', marginRight:'10px'}}/>
          <Typography variant="h4" style={{ marginRight: "30px", fontWeight:'500' }}>
            Fire Buster
          </Typography>
            <Button color="inherit" style={{marginLeft: '30px'}} href={"/"}>Alerts</Button>
            <Button color="inherit" style={{marginLeft: '30px'}} href={"/ReportWildfire"}>Report Wildfire</Button>
            <Button color="inherit" style={{marginLeft: '30px'}} href={"/Statistics"}>Statistics</Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/" component={AlertsPage} />
        <Route path="/ReportWildfire" component={ReportWildFirePage} />
        <Route path="/Statistics" component={StatisticsPage} />
      </Switch>
    </Router>
    </ThemeProvider>
  );
}

export default App;

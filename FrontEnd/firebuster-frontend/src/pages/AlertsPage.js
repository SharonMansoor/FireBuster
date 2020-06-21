import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import AlertsBar from '../components/AlertsBar/AlertsBar';
import alerts from "../TempData/Alerts";
import MapAlerts from "../components/MapAlerts";

class AlertsPage extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true,
      currAlert: '',
      alerts: []
    };
    this.handleAlertClick = this.handleAlertClick.bind(this)
  }

  componentDidMount(){
    fetch("http://localhost:3000/getallalerts")
    .then(response => response.json())
    .then(data => this.setState({...this.state,
      isFetching: false,
      alerts: data
  }));
  }

  handleAlertClick(alert) {
    this.setState(() => {
      return {
        currAlert: alert
    }
    });
}

  render() {
    console.log(this.state.isFetching)
    console.log(this.state.alerts);
    return (
        <Grid container direction="row" alignItems="stretch" style={{height: 'calc(100vh - 64px)'}}>
          <Grid item md={3} style={{overflowY: 'auto', height: '100%',  backgroundColor: "#eeeeee"}}>
            <AlertsBar alerts={this.state.alerts} currAlert={this.state.currAlert} isFetching={this.state.isFetching}  handleAlertClick={this.handleAlertClick}/>
          </Grid>
          <Grid item md={9}>
            <MapAlerts alerts={this.state.alerts}  currAlert={this.state.currAlert} isFetching={this.state.isFetching}/>
          </Grid>
        </Grid>
    );
  }
}

export default AlertsPage;
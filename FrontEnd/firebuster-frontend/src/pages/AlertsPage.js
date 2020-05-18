import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import AlertsBar from '../components/AlertsBar/AlertsBar';
import alerts from "../TempData/Alerts";
import MapAlerts from "../components/MapAlerts";



class AlertsPage extends Component {
  constructor() {
    super();
    this.state = {
      currAlert: alerts[0]
    };
    this.handleAlertClick = this.handleAlertClick.bind(this)
  }

  handleAlertClick(alert) {
    this.setState(() => {
      return {
        currAlert: alert
    }
    });
}

  render() {
    return (
        <Grid container direction="row" alignItems="stretch" style={{height: 'calc(100vh - 64px)'}}>
          <Grid item md={3} style={{overflowY: 'auto', height: '100%',  backgroundColor: "#eeeeee"}}>
            <AlertsBar alerts={alerts} currAlert={this.state.currAlert}   handleAlertClick={this.handleAlertClick}/>
          </Grid>
          <Grid item md={9}>
            <MapAlerts alerts={alerts}  currAlert={this.state.currAlert}/>
          </Grid>
        </Grid>
    );
  }
}

export default AlertsPage;
import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import AlertsBar from '../components/AlertsBar';
import alerts from "../TempData/Alerts";
import MapAlerts from "../components/MapAlerts";

class AlertsPage extends Component {
  render() {
    return (
        <Grid container direction="row" alignItems="stretch" style={{height: 'calc(100vh - 64px)'}}>
          <Grid item md={3} style={{overflowY: 'auto', height: '100%',  backgroundColor: "#eeeeee"}}>
            <AlertsBar alerts={alerts}/>
          </Grid>
          <Grid item md={9} style={{height: '100%'}}>
            <MapAlerts alerts={alerts}/>
          </Grid>
        </Grid>
    );
  }
}

export default AlertsPage;
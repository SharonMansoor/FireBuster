import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import AlertsBar from '../components/AlertsBar';

class AlertsPage extends Component {
  render() {
    return (
        <Grid container direction="row" alignItems="stretch" style={{height: 'calc(100vh - 64px)'}}>
          <Grid item md={3} style={{overflowY: 'auto', height: '100%',  backgroundColor: "#eeeeee"}}>
            <AlertsBar/>
          </Grid>
          <Grid item md={9}></Grid>
        </Grid>
    );
  }
}

export default AlertsPage;
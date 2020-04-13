import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

class Alert extends Component {
  render() {
    return (
        <Paper elevation={3} style={{ backgroundColor: "#fafafa", padding: '5px', margin: '15px 15px 0px 15px' }}>
          <Grid container direction="row" spacing={1}>
            <Grid item md={6}>
              <Typography style={{ fontWeight: "600" }}>Location</Typography>
              <Typography>X, Y</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography style={{ fontWeight: "600" }}>Severity</Typography>
              <Typography>High</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography style={{ fontWeight: "600" }}>Time</Typography>
              <Typography>10.05.2020, 12:00AM</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography style={{ fontWeight: "600" }}>Probability</Typography>
              <Typography>60%</Typography>
            </Grid>
          </Grid>
        </Paper>
    );
  }
}

export default Alert;
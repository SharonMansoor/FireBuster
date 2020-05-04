import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

class Alert extends Component {
  render() {
    return (
      <Paper
        elevation={3}
        style={{
          backgroundColor: "#fafafa",
          padding: "5px",
          margin: "15px 15px 0px 15px",
        }}
      >
        <Grid container direction="row" spacing={1}>
          <Grid item md={7}>
            <Typography style={{ fontWeight: "600" }}>Location</Typography>
            <Typography>{this.props.alert.locationLAT + ", " + this.props.alert.locationLG}</Typography>
          </Grid>
          <Grid item md={5}>
            <Typography style={{ fontWeight: "600" }}>Severity</Typography>
            <Typography>{this.props.alert.severity}</Typography>
          </Grid>
          <Grid item md={7}>
            <Typography style={{ fontWeight: "600" }}>Time</Typography>
            <Typography>{this.props.alert.time}</Typography>
          </Grid>
          <Grid item md={5}>
            <Typography style={{ fontWeight: "600" }}>Probability</Typography>
            <Typography>{this.props.alert.probability}</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Alert;

import React, { Component } from "react";
import { Box, Paper, Typography, Grid } from "@material-ui/core";
import Alert from "./Alert";

class AlertsBar extends Component {
  render() {
    return (
      <Box
        item
        md={3}
        style={{ height: "100%" }}
      >
          <Grid container >
            {this.props.alerts.map(alert => <Grid item><Alert alert={alert}/></Grid>)}
          </Grid>
      </Box>
    );
  }
}

export default AlertsBar;

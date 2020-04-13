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
              <Grid item><Alert/></Grid>
              <Grid item><Alert/></Grid>
              <Grid item><Alert/></Grid>
          </Grid>
      </Box>
    );
  }
}

export default AlertsBar;

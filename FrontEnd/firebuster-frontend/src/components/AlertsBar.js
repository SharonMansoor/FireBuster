import React, { Component } from "react";
import { Box, Paper, Typography, Grid } from "@material-ui/core";
import Alert from "./Alert";

class AlertsBar extends Component {
  render() {
    return (
      <Box item md={3} style={{ height: "100%" }}>
        <Grid container>
          {this.props.alerts.map((alert) => (
            <Grid item>
              <Paper
                elevation={3}
                style={{
                  backgroundColor: "#fafafa",
                  padding: "5px",
                  margin: "15px 15px 0px 15px",
                }}
                onClick={() => this.props.handleAlertClick(alert)}
              >
                <Alert key={alert.id} alert={alert} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default AlertsBar;

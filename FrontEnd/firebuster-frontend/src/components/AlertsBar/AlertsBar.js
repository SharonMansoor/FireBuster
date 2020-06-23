import React, { Component } from "react";
import { Box, Paper, Grid, Typography } from "@material-ui/core";
import Alert from "../Alert";
import "./AlertsBar.css";
import "../../index.css";

class AlertsBar extends Component {
  render() {
    return (
      <Box style={{ height: "100%" }}>
        <Grid container>
          {!this.props.isFetching?
          <>
          <Typography color='primary' variant='h6' style={{ margin: "15px 15px 0px 15px" }}>
            {this.props.alerts.length!==0? 'Number of alerts: ' + this.props.alerts.length : 'There are no alerts found'}
          </Typography>
          {this.props.alerts.map((alert) => (
            <Grid item key={alert._id}>
              <Paper
                className={`alert ${
                  this.props.currAlert._id === alert._id ? "selectedAlert" : null
                } ${
                  this.props.hoverAlert._id === alert._id ? "hoverAlert hvr-bob" : null
                }`}
                elevation={3}
                style={{
                  backgroundColor: "#fafafa",
                  padding: "5px",
                  margin: "0px 14px 14px 14px",
                }}
                onClick={()=>this.props.handleAlertClick(alert)}
                onPointerEnter={()=>this.props.handleAlertHover(alert)}
                onPointerLeave={()=>this.props.handleAlertHoverOut()}
              >
                <Alert alert={alert} />
              </Paper>
            </Grid>
          ))} </>:
            'loading'  }
        </Grid>
      </Box>
    );
  }
}

export default AlertsBar;

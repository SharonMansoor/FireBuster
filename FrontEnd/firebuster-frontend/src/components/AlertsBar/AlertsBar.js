import React, { Component } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import Alert from "../Alert";
import "./AlertsBar.css";
import "../../index.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Axios from "axios";

class AlertsBar extends Component {
  confirmAlert(alertID) {
    console.log(alertID);
    Axios.post("http://localhost:3000/confirmAlert", { alert_ID: alertID })
      .then((response) => {
        if (response.data === "Success") {
          console.log("success");
          var index = this.props.alerts.findIndex(alert => alert._id === alertID);
          this.props.alerts[index].confirmed = true;
          this.forceUpdate();
        }
      })
      .catch((error) => console.log("error"));
  }

  render() {
    return (
      <Box style={{ height: "100%" }}>
        <Grid container>
          {!this.props.isFetching ? (
            <>
              <Typography
                color="primary"
                variant="h6"
                style={{ margin: "15px 15px 0px 15px" }}
              >
                {this.props.alerts.length !== 0
                  ? "Number of alerts: " + this.props.alerts.length
                  : "There are no alerts found"}
              </Typography>
              {this.props.alerts.map((alert) => (
                <Grid
                  item
                  key={alert._id}
                  style={{ padding: "0px 14px 14px 14px" }}
                  className={
                    this.props.hoverAlert._id === alert._id ? "hvr-bob" : null
                  }
                >
                  <Paper
                    className={`alert ${
                      this.props.currAlert._id === alert._id
                        ? "selectedAlert"
                        : null
                    } ${
                      this.props.hoverAlert._id === alert._id
                        ? "hoverAlert"
                        : null
                    }`}
                    elevation={3}
                    style={{
                      backgroundColor: "#fafafa",
                      padding: "5px",
                    }}
                    onClick={() => this.props.handleAlertClick(alert)}
                    onPointerEnter={() => this.props.handleAlertHover(alert)}
                    onPointerLeave={() => this.props.handleAlertHoverOut()}
                  >
                    <Alert alert={alert} />
                  </Paper>
                  {(alert.probability !== 'Reported')&&
                  <>
                  {alert.confirmed ? (
                    <Grid style={{ direction: "rtl" }}>
                      <IconButton size="small" disabled>
                        <CheckCircleIcon color="primary" />
                      </IconButton>
                      Confirmed
                    </Grid>
                  ) : (
                    <Tooltip title="Confirm" arrow>
                      <IconButton
                        size="small"
                        style={{ float: "right" }}
                        onClick={() => this.confirmAlert(alert._id)}
                      >
                        <CheckCircleOutlineIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  )}</>}
                </Grid>
              ))}
            </>
          ) : (
            "loading"
          )}
        </Grid>
      </Box>
    );
  }
}

export default AlertsBar;

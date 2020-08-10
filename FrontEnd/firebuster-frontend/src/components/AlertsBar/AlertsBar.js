import React, { Component, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@material-ui/core";
import Alert from "../Alert";
import "./AlertsBar.css";
import "../../index.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Axios from "axios";
import RefreshIcon from "@material-ui/icons/Refresh";

function AlertsBar(props) {
  const confirmAlert = (alertID) => {
    console.log(alertID);
    Axios.post("/confirmAlert", { alert_ID: alertID })
      .then((response) => {
        if (response.data === "Success") {
          console.log("success");
          props.handleAlertConfimed(alertID);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box style={{ height: "100%" }}>
      <Grid container style={{ height: '100%' }}>
        {!props.isFetching ? (
          <>

            <Grid container style={{ padding: "15px", backgroundColor:'#fff0c1'}}>
            <Grid item md={4}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Severity</InputLabel>
                <Select
                  labelId="select-label"
                  value={props.severityFilter}
                  onChange={props.setSeverityFilter}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={7}>
              <Typography color="textPrimary" variant="body1" style={{marginTop: '20px', marginLeft:'10px'}}>
                {props.filterAlerts.length !== 0
                  ? props.filterAlerts.length + " alerts found"
                  : "There are no alerts found"}
              </Typography>
            </Grid>
            <Grid item md={1}>
              <IconButton style={{ padding: "5px" }} onClick={props.loadAlertsData}>
                <RefreshIcon />
              </IconButton>
            </Grid>
            </Grid>
            
            <Grid item style={{overflowY: 'auto', height:'calc(100% - 77.7px)', padding: '10px'}}>
            {props.filterAlerts
            .sort((a,b)=> new Date(a.time) - new Date(b.time))
            .map((alert) => (
              <Grid item key={alert._id}>
                <Paper
                  className={`alert ${
                    props.currAlert._id === alert._id ? "selectedAlert" : null
                  } ${
                    props.hoverAlert._id === alert._id ? "hoverAlert" : null
                  }`}
                  elevation={3}
                  style={{
                    backgroundColor: "#fafafa",
                    padding: "5px",
                  
                  }}
                  onClick={() => props.handleAlertClick(alert)}
                  onPointerEnter={() => props.handleAlertHover(alert)}
                  onPointerLeave={() => props.handleAlertHoverOut()}
                >
                  <Alert alert={alert} />
                </Paper>
                {alert.probability !== "Reported" && (
                  <>
                    {alert.confirmed ? (
                      <Grid style={{ direction: "rtl" , marginBottom: '15px'}}>
                        <IconButton
                          size="small"
                          disabled
                          style={{ padding: "0px", }}
                        >
                          <CheckCircleIcon color="primary" />
                        </IconButton>
                      </Grid>
                    ) : (
                      
                        <Grid style={{ direction: "rtl", marginBottom:'15px' }}>
                          <Tooltip title="Confirm" arrow>
                        <IconButton
                          size="small"
                          onClick={() => confirmAlert(alert._id)}
                          style={{
                            padding: "0px",                            
                            boxShadow:
                              "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
                          }}
                        >
                          <CheckCircleOutlineIcon color="primary" />
                        </IconButton>
                        </Tooltip>
                        </Grid>
                      
                    )}
                                      </>
                )}
              </Grid>
            ))}
            </Grid>
          </>
        ) : (
          "loading"
        )}
      </Grid>
    </Box>
  );
}

export default AlertsBar;

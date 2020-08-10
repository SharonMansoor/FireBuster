import React, { Component, useState, useRef, useEffect } from "react";
import { Grid } from "@material-ui/core";
import AlertsBar from "../components/AlertsBar/AlertsBar";
import MapAlerts from "../components/MapAlerts";

function AlertsPage () {
  const [state, setState] = useState({
    isFetching: true,
    currAlert: "",
    alerts: [],
    filterAlerts: [],
    hoverAlert: "",
    severityFilter: 'high'
  });

  const intervalAPI = useRef();
  
  useEffect(() => {
    loadAlertsData();
  }, []);  

  useEffect(() => {
    console.log(state.severityFilter)
    setState({...state, filterAlerts: state.alerts.filter(alert=> alert.severity === state.severityFilter)})
  }, [state.severityFilter, state.alerts])
  

  const loadAlertsData = () =>{
    setState({...state, isFetching: true});
    fetch("/getallalerts")
      .then((response) => response.json())
      .then((data) =>
        setState({ ...state, isFetching: false, alerts: data, filterAlerts: data })
      );
  }

  const handleAlertConfimed = (alertID) => {    
    const modifiedAlerts = state.alerts.map((alert) =>(alert._id === alertID? {...alert, confirmed: true}: alert));
    setState({...state, alerts: modifiedAlerts});
  }

  const handleAlertClick= (alert) => {
    setState({...state, currAlert: alert});
  }

  const handleAlertHover = (alert) => {
    setState({...state, hoverAlert: alert});
  }

  const handleAlertHoverOut = () => {
    setState({...state, hoverAlert: ""});
  }

  const setSeverityFilter = (e) => {
    setState({...state, severityFilter: e.target.value});
  }

    return (
      <Grid
        container
        direction="row"
        alignItems="stretch"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <Grid
          item
          md={3}
          style={{

            height: "100%",
            backgroundColor: "#eeeeee",
          }}
        >
          <AlertsBar {...state} loadAlertsData={loadAlertsData} handleAlertConfimed={handleAlertConfimed} setSeverityFilter={setSeverityFilter} handleAlertClick={handleAlertClick} handleAlertHover={handleAlertHover} handleAlertHoverOut={handleAlertHoverOut}  />
        </Grid>
        <Grid item md={9}>
          <MapAlerts {...state} handleAlertClick={handleAlertClick} handleAlertHover={handleAlertHover} handleAlertHoverOut={handleAlertHoverOut} />
        </Grid>
      </Grid>
    );
}

export default AlertsPage;

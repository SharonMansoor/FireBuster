import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import AlertsBar from "../components/AlertsBar/AlertsBar";
import MapAlerts from "../components/MapAlerts";

class AlertsPage extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true,
      currAlert: "",
      alerts: [],
      hoverAlert: "",
    };
    this.handleAlertClick = this.handleAlertClick.bind(this);
    this.handleAlertHover = this.handleAlertHover.bind(this);
    this.handleAlertHoverOut = this.handleAlertHoverOut.bind(this);
  }

  componentDidMount() {
    this.loadAlertsData();
    setInterval(this.loadAlertsData.bind(this), 30000);
  }

  async loadAlertsData(){
    await fetch("http://localhost:3000/getallalerts")
      .then((response) => response.json())
      .then((data) =>
        this.setState({ ...this.state, isFetching: false, alerts: data })
      );
  }

  handleAlertClick(alert) {
    this.setState(() => {
      return {
        currAlert: alert,
      };
    });
  }

  handleAlertHover(alert) {
    this.setState(() => {
      return {
        hoverAlert: alert,
      };
    });
  }

  handleAlertHoverOut() {
    this.setState(() => {
      return {
        hoverAlert: "",
      };
    });
  }

  render() {
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
            overflowY: "auto",
            height: "100%",
            backgroundColor: "#eeeeee",
          }}
        >
          <AlertsBar {...this.state} handleAlertClick={this.handleAlertClick} handleAlertHover={this.handleAlertHover} handleAlertHoverOut={this.handleAlertHoverOut}  />
        </Grid>
        <Grid item md={9}>
          <MapAlerts {...this.state} handleAlertClick={this.handleAlertClick} handleAlertHover={this.handleAlertHover} handleAlertHoverOut={this.handleAlertHoverOut} />
        </Grid>
      </Grid>
    );
  }
}

export default AlertsPage;

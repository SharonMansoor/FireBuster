import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import ReportFireForm from "../components/ReportFireForm";
import MapReport from "../components/MapReport"

class ReportWildFirePage extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        lat: 32.736029,
        lng: 35.058554,
      },
      intensity: "",
      cause: "",
      moreInfo: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
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
          <ReportFireForm handleChange={this.handleChange} state={this.state}/>
        </Grid>
        <Grid item md={9} style={{height: '100%'}}>
            <MapReport/>
          </Grid>
      </Grid>
    );
  }
}

export default ReportWildFirePage;

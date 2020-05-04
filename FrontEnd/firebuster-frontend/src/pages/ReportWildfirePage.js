import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import ReportFireForm from "../components/ReportFireForm";
import MapReport from "../components/MapReport"

class ReportWildFirePage extends Component {
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
          <ReportFireForm/>
        </Grid>
        <Grid item md={9} style={{height: '100%'}}>
            <MapReport/>
          </Grid>
      </Grid>
    );
  }
}

export default ReportWildFirePage;

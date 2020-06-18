import React, { Component } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";

const severities = [
  {
    value: "1",
    label: "Low",
  },
  {
    value: "2",
    label: "Moderate",
  },
  {
    value: "3",
    label: "High",
  },
];

const causes = [
  {
    value: "1",
    label: "Extreme Weather",
  },
  {
    value: "2",
    label: "Human Cause",
  },
  {
    value: "3",
    label: "Unknown",
  },
];

class ReportFireForm extends Component {
  submitForm = (e) => {
    e.preventDefault();
    console.log(this.props.state);

    Axios.post("http://localhost:3000/postNewAlert", this.props.state)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <Box p={3}>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item md={12}>
              <TextField
                value={
                  this.props.state.location
                    ? this.props.state.location.lat +
                      ", " +
                      this.props.state.location.lng
                    : null
                }
                name="location"
                onChange={this.props.handleChange}
                label="Location"
                fullWidth
                placeholder="Choose from map"
                disabled
                InputLabelProps={{ shrink: "true" }}
              />
            </Grid>
            <Grid item md={12}>
              <FormControl fullWidth>
                <InputLabel id="intensityLabel">Intensity</InputLabel>
                <Select
                  value={this.props.state.intensity}
                  name="intensity"
                  onChange={this.props.handleChange}
                  labelId="intensityLabel"
                >
                  {severities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <FormControl fullWidth>
                <InputLabel id="causeLabel">Cause</InputLabel>
                <Select
                  value={this.props.state.cause}
                  name="cause"
                  onChange={this.props.handleChange}
                  labelId="causeLabel"
                >
                  {causes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <TextField
                multiline
                label="More Information"
                name="moreInfo"
                fullWidth
                onChange={this.props.handleChange}
              />
            </Grid>
            <Grid item md={12}>
              <Fab
                color="secondary"
                size="medium"
                style={{ float: "right" }}
                onClick={this.submitForm}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  }
}

export default ReportFireForm;

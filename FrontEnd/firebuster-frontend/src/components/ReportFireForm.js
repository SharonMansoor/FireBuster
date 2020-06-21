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
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import Axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const severities = [
  {
    label: "Low",
  },
  {
    label: "Moderate",
  },
  {
    label: "High",
  },
];

const causes = [
  {
    label: "Extreme Weather",
  },
  {
    label: "Human Cause",
  },
  {
    label: "Unknown",
  },
];

class ReportFireForm extends Component {
  constructor() {
    super();
    this.state = {
      successAlert: false,
      errorAlert: false
    };
  }

  handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({...this.state, successAlert: false});
    this.setState({...this.state, errorAlert: false});
  };

  submitForm = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/postNewAlert", this.props.state)
      .then((response) => {
        if (response.data === "Success") {
          
          this.setState({...this.state, successAlert: true});
        }
      })
      .catch((error) => this.setState({...this.state, errorAlert: true}));
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
                  value={this.props.state.severity}
                  name="severity"
                  onChange={this.props.handleChange}
                  labelId="intensityLabel"
                >
                  {severities.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
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
                    <MenuItem key={option.label} value={option.label}>
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.state.successAlert}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackBar}
        >
          <Alert onClose={this.handleCloseSnackBar} severity="success">
            Reported Wildfire successfully
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.state.errorAlert}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackBar}
        >
          <Alert onClose={this.handleCloseSnackBar} severity="error">
            Somthing went wrong, Please try again
          </Alert>
        </Snackbar>
      </Box>
    );
  }
}

export default ReportFireForm;

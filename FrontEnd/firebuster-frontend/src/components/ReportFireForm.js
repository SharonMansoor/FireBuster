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
import AddIcon from '@material-ui/icons/Add';

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


  render() {
    return (
      <Box p={3}>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item md={12}>
              <TextField
                value={this.props.state.location.lat + ', ' + this.props.state.location.lng }
                name="location"
                onChange={this.props.handleChange}
                label="Location"
                fullWidth
                placeholder="Choose from map"
                disabled
                InputLabelProps={{shrink: 'true'}}
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
              <TextField multiline label="More Information" fullWidth onChange={this.props.handleChange}/>
            </Grid>
            <Grid item md={12}>
            <Fab color='secondary' size='medium' style={{float:'right'}}>
              <AddIcon/>
          </Fab>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  }
}

export default ReportFireForm;

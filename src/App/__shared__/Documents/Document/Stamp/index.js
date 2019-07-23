import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import Chip from '@material-ui/core/Chip';

import * as actions from '../../../../../state/actions';

class Stamp extends React.Component {

  handleStatusChange = (event) => {
    const { document, stamp, onStatusChange } = this.props;
    onStatusChange(document, stamp, event.target.value);
  }

  handleExpiresAtChange = (event) => {
    const { document, stamp, onExpiresAtChange } = this.props;
    onExpiresAtChange(document, stamp, event.target.value);
  }

  render() {
    const { stamp, specialty } = this.props;
    
    const statusColor = {
      approved: 'primary',
      declined: 'secondary',
      pending: 'default'
    };

    return (
      <div style={{width: '100%'}}>
        <div style={{display: "flex", marginTop:"20px"}} >
          <Typography color="primary" >{specialty.name}</Typography>

          <Chip
            style={{marginRight: "0px", marginLeft: "auto"}}
            label={stamp.status.toUpperCase()}
            color={statusColor[stamp.status]}
          />
        </div>

        <TextField
          style={{marginTop:"20px"}}
          required
          onChange={this.handleExpiresAtChange}
          value={stamp.expiresAt}
          margin="dense"
          label="Expires At"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />      

        <InputLabel  style={{marginTop:"20px"}}>Status</InputLabel>
        <Select 
          disabled={!stamp.expiresAt}
          fullWidth
          value={stamp.status}
          onChange={this.handleStatusChange}
        >
          <MenuItem value={'approved'}>Approved</MenuItem>
          <MenuItem value={'declined'}>Declined</MenuItem>
        </Select> 
      </div> 
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStatusChange: (document, stamp, status) => {
      dispatch(actions.documentsUpdateStatus(document.id, stamp.specialtyId, status));
    },
    onExpiresAtChange: (document, stamp, expiresAt) => {
      dispatch(actions.documentsUpdateExpiry(document.id, stamp.specialtyId, expiresAt));
    },
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
)(Stamp);


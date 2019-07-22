import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";

import DocumentFiles from './Files';
import * as actions from '../../../../state/actions';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Document extends React.Component {

  constructor() {
    super();

    this.state = {
      expanded: false
    };
  }

  handleExpandChange = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  handleStatusChange = (event) => {
    const { document, onStatusChange } = this.props;
    onStatusChange(document, event.target.value);
  }

  handleExpiresAtChange = (event) => {
    const { document, onExpiresAtChange } = this.props;
    onExpiresAtChange(document, event.target.value);
  }

  render() {
    const { expanded } = this.state;
    const { classes, document, documentType, isForAdmin } = this.props;
    const statusColor = {
      approved: 'primary',
      declined: 'secondary',
      pending: 'default'
    };

    return (
      <ExpansionPanel expanded={expanded} onChange={this.handleExpandChange}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{documentType.name}</Typography>
          <Chip
            size="small"
            label={documentType.level.toUpperCase()}
            className={classes.chip}
          />

          <div style={{ flex: 1 }} />

          <Chip
            size="small"
            label={document.status.toUpperCase()}
            className={classes.chip}
            color={statusColor[document.status]}
          />
        </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{width: '100%'}}>
              <DocumentFiles document={document} />

              {isForAdmin && 
                <React.Fragment>
                  <TextField
                    style={{marginTop:"20px"}}
                    required
                    onChange={this.handleExpiresAtChange}
                    value={document.expiresAt}
                    margin="dense"
                    label="Expires At"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />      

                  <InputLabel  style={{marginTop:"20px"}}>Document status</InputLabel>
                  <Select 
                    disabled={!document.expiresAt}
                    fullWidth
                    value={document.status}
                    onChange={this.handleStatusChange}
                  >
                    <MenuItem value={'approved'}>Approved</MenuItem>
                    <MenuItem value={'declined'}>Declined</MenuItem>
                  </Select> 
                </React.Fragment> 
              }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStatusChange: (document, status) => {
      dispatch(actions.documentsUpdateStatus(document.id, status));
    },
    onExpiresAtChange: (document, expiresAt) => {
      dispatch(actions.documentsUpdateExpiry(document.id, expiresAt));
    },
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Document);


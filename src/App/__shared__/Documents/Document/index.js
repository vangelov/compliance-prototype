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

import DocumentFiles from './Files';
import Stamp from './Stamp';
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

  render() {
    const { expanded } = this.state;
    const { classes, document, documentType, isForAdmin, specialties } = this.props;
    
    const specialtiesMap = {};

    for (const specialty of specialties) {
      specialtiesMap[specialty.id] = specialty;
    }

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
        </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{width: '100%'}}>
              <DocumentFiles document={document} />

              {isForAdmin && document.stamps.map((stamp) => {
                const specialty = specialtiesMap[stamp.specialtyId];

                return (
                  <Stamp 
                    document={document} 
                    stamp={stamp} 
                    specialty={specialty} 
                  />
                );
              })}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    );
  }
}

const mapStateToProps = state => {
  return {
      specialties: state.specialties
  };
};

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
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Document);


import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import AdminPart from './AdminPart';
import NursePart from './NursePart';
import * as actions from '../state/actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
});

export const USER_PROFILE_ADMIN = 'admin';
export const USER_PROFILE_NURSE = 'nurse';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      userProfile: USER_PROFILE_ADMIN
    };
  }

  componentDidMount() {
    setInterval(() => {
      const { 
        specialties, 
        documentTypes, 
        onDocumentsTimePass,
        onComplianceUpdate,
        nurse
      } = this.props;

      const specialtiesMap = {};
      for (const specialty of specialties) {
        specialtiesMap[specialty.id] = specialty;
      }

      const appliedSpecialties = nurse.appliedSpecialtiesIds.map((specialtyId) => specialtiesMap[specialtyId]);

      onDocumentsTimePass(appliedSpecialties, documentTypes);

      setTimeout(() => {
        const { documents } = this.props;
        onComplianceUpdate(documents, documentTypes, appliedSpecialties);
      }, 0);
    }, 1000);
  }

  handleUserProfileChange = (event) => {
    this.setState({ userProfile: event.target.value });
  }

  render() {
    const { classes } = this.props;
    const { userProfile } = this.state;

    return (
      <div className={classes.root}>
        <InputLabel>User Profile</InputLabel>
        <Select
          value={userProfile}
          onChange={this.handleUserProfileChange}
        >
          <MenuItem value={USER_PROFILE_ADMIN}>Admin</MenuItem>
          <MenuItem value={USER_PROFILE_NURSE}>Nurse</MenuItem>
        </Select>
         
        {userProfile === USER_PROFILE_ADMIN && <AdminPart />}
        {userProfile === USER_PROFILE_NURSE && <NursePart />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    documentTypes: state.documentTypes,
    documents: state.documents,
    nurse: state.nurse,
    specialties: state.specialties
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDocumentsTimePass: (nurse, documentTypes) => {
      dispatch(actions.documentsTimePass(nurse, documentTypes));
    },
    onComplianceUpdate: (documents, documentTypes, specialties) => {
      dispatch(actions.complianceUpdate(documents, documentTypes, specialties));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(App);

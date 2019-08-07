import React from 'react';
import { connect } from "react-redux";

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import * as actions from '../../../../state/actions';

class DocumentsSpecialties extends React.Component {

  handleCheckboxChange = (specialty, selected) => {
    if (selected) {
      this.props.onAddSpecialty(specialty);
    } else {
      this.props.onRemoveSpecialty(specialty);
    }
  }

  handleJobChange = (event) => {
    this.props.onSetRootSpecialty(event.target.value);
  }

  render() {
    const { specialties, nurse } = this.props;
    let rootSpecialtyId;

    const specialtiesWithoutParents = specialties.filter((specialty) => specialty.parentId === null);
    let specialtiesForJob = [];

    if (nurse.appliedSpecialtiesIds.length > 0) {
      rootSpecialtyId = nurse.appliedSpecialtiesIds[0];
      specialtiesForJob = specialties.filter((specialty) => specialty.id === rootSpecialtyId || specialty.parentId === rootSpecialtyId);
    }

    return (
      <div>
        <div>
          <TextField
            value={rootSpecialtyId}
            onChange={this.handleJobChange}
            select
            fullWidth
            label="Job"
            margin="dense"
          >
            {specialtiesWithoutParents.map((specialty) => (
                <MenuItem key={specialty.id} value={specialty.id}>
                    {specialty.name}
                </MenuItem>
            ))}
          </TextField>
        </div>

        <div style={{ display: 'flex', marginTop: "20px", marginBottom: "20px"}}>
          {specialtiesForJob.map((specialty) => {
            return (
              <FormControlLabel
                key={specialty.id}
                control={
                  <Checkbox  
                    disabled={specialty.id === rootSpecialtyId}
                    color="primary" 
                    onChange={(event) => this.handleCheckboxChange(specialty, event.target.checked)}
                    checked={nurse.appliedSpecialtiesIds.indexOf(specialty.id) >= 0} 
                    value="antoine" 
                  />
                }
                label={specialty.name + (specialty.id === rootSpecialtyId ? ':' : '')}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      specialties: state.specialties,
      nurse: state.nurse
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddSpecialty: (specialty) => {
      dispatch(actions.nurseAddSpecialty(specialty.id));
    },
    onRemoveSpecialty: (specialty) => {
      dispatch(actions.nurseRemoveSpecialty(specialty.id));
    },
    onSetRootSpecialty: (specialtyId) => {
      dispatch(actions.nurseSetRootSpecialty(specialtyId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsSpecialties);
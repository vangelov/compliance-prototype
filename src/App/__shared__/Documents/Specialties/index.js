import React from 'react';
import { connect } from "react-redux";

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as actions from '../../../../state/actions';

class DocumentsSpecialties extends React.Component {

  handleCheckboxChange = (specialty, selected) => {
    if (selected) {
      this.props.onAddSpecialty(specialty);
    } else {
      this.props.onRemoveSpecialty(specialty);
    }
  }

  render() {
    const { specialties, nurse } = this.props;

    return (
      <div style={{ display: 'flex', marginTop: "20px", marginBottom: "20px"}}>
        {specialties.map((specialty) => {
          return (
            <FormControlLabel
              key={specialty.id}
              control={
                <Checkbox  
                  color="primary" 
                  onChange={(event) => this.handleCheckboxChange(specialty, event.target.checked)}
                  checked={nurse.appliedSpecialtiesIds.indexOf(specialty.id) >= 0} 
                  value="antoine" 
                />
              }
              label={specialty.name}
            />
          );
        })}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsSpecialties);
import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';

import TableToolbar from '../../__shared__/TableToolbar';
import AdminCreateSpecialtyDialog from './CreateSpecialtyDialog';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

class AdminSpecialties extends React.Component {

  constructor() {
    super();
    
    this.state = {
      specialtyCreateOrEditDialogOpened: false,
      specialtyForEditing: null
    };
  }

  handleNewSpecialtyDialogClose = () => {
    this.setState({ 
      specialtyCreateOrEditDialogOpened: false, 
      specialtyForEditing: null 
    });
  }

  handleNewSpecialtyDialogOpen = () => {
    this.setState({ specialtyCreateOrEditDialogOpened: true });
  }

  handleEditSpecialty = (specialty) => {
    this.setState({ 
      specialtyCreateOrEditDialogOpened: true, 
      specialtyForEditing: specialty 
    });
  }
  
  
  render() {
    const { classes, specialties } = this.props;
    const { specialtyCreateOrEditDialogOpened, specialtyForEditing } = this.state;

    return (
      <Paper className={classes.root}>

       {specialtyCreateOrEditDialogOpened && <AdminCreateSpecialtyDialog 
          specialty={specialtyForEditing}
          onClose={this.handleNewSpecialtyDialogClose} 
        />}

        <TableToolbar title="SPECIALTIES" onCreate={this.handleNewSpecialtyDialogOpen} />

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Number of documents</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {specialties.map(specialty => (
              <TableRow key={specialty.name}>
                <TableCell component="th" scope="row">
                  {specialty.name}
                </TableCell>
                <TableCell align="right">{specialty.documentTypeIds.length}</TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => this.handleEditSpecialty(specialty)} edge="end">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
      specialties: state.specialties
  };
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withStyles(styles)
)(AdminSpecialties);
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
      newSpecialtyDialogOpened: false
    };
  }

  handleNewSpecialtyDialogClose = () => {
    this.setState({ newSpecialtyDialogOpened: false });
  }

  handleNewSpecialtyDialogOpen = () => {
    this.setState({ newSpecialtyDialogOpened: true });
  }
  
  render() {
    const { classes, specialties } = this.props;
    const { newSpecialtyDialogOpened } = this.state;

    return (
      <Paper className={classes.root}>

       <AdminCreateSpecialtyDialog 
          open={newSpecialtyDialogOpened} 
          onClose={this.handleNewSpecialtyDialogClose} 
          onCreate={this.handleNewSpecialtyDialogClose}
        />

        <TableToolbar title="SPECIALTIES" onCreate={this.handleNewSpecialtyDialogOpen} />

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Number of documents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {specialties.map(specialty => (
              <TableRow key={specialty.name}>
                <TableCell component="th" scope="row">
                  {specialty.name}
                </TableCell>
                <TableCell align="right">{specialty.documentTypeIds.length}</TableCell>
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
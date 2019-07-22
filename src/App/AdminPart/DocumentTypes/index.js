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
import AdminCreateDocumentTypeDialog from './CreateDocumentTypeDialog';

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

class AdminDocumentTypes extends React.Component {

  constructor() {
    super();
    
    this.state = {
      newDocumentDialogOpened: false
    };
  }

  handleNewDocumentDialogClose = () => {
    this.setState({ newDocumentDialogOpened: false });
  }

  handleNewDocumentDialogOpen = () => {
    this.setState({ newDocumentDialogOpened: true });
  }
  
  render() {
    const { classes, documentTypes } = this.props;
    const { newDocumentDialogOpened } = this.state;

    return (
      <Paper className={classes.root}>
        <AdminCreateDocumentTypeDialog 
          open={newDocumentDialogOpened} 
          onClose={this.handleNewDocumentDialogClose} 
          onCreate={this.handleNewDocumentDialogClose}
        />

        <TableToolbar title="DOCUMENT TYPES" onCreate={this.handleNewDocumentDialogOpen} />

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Effective from</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentTypes.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.level}</TableCell>
                <TableCell align="right">{row.effectiveFrom}</TableCell>
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
      documentTypes: state.documentTypes
  };
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withStyles(styles)
)(AdminDocumentTypes);
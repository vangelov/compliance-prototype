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
import AdminCreateOrEditDocumentTypeDialog from './CreateOrEditDocumentTypeDialog';

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
      documentTypeCreateOrEditDialogOpened: false,
      documentTypeForEditing: null
    };
  }

  handleNewDocumentTypeDialogClose = () => {
    this.setState({ 
      documentTypeCreateOrEditDialogOpened: false,
      documentTypeForEditing: null
    });
  }

  handleNewDocumentTypeDialogOpen = () => {
    this.setState({ documentTypeCreateOrEditDialogOpened: true });
  }

  handleEditDocumentType = (document) => {
    this.setState({ 
      documentTypeCreateOrEditDialogOpened: true, 
      documentTypeForEditing: document 
    });
  }
  
  render() {
    const { classes, documentTypes } = this.props;
    const { documentTypeCreateOrEditDialogOpened, documentTypeForEditing } = this.state;

    return (
      <Paper className={classes.root}>
        {documentTypeCreateOrEditDialogOpened && <AdminCreateOrEditDocumentTypeDialog 
          documentType={documentTypeForEditing}
          onClose={this.handleNewDocumentTypeDialogClose} 
        />}

        <TableToolbar title="DOCUMENT TYPES" onCreate={this.handleNewDocumentTypeDialogOpen} />

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Effective from</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {documentTypes.map((documentType) => (
              <TableRow key={documentType.name}>
                <TableCell component="th" scope="row">
                  {documentType.name}
                </TableCell>
                <TableCell align="right">{documentType.level}</TableCell>
                <TableCell align="right">{documentType.effectiveFrom}</TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => this.handleEditDocumentType(documentType)} edge="end">
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
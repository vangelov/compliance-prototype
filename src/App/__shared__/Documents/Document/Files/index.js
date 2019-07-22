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
import DeleteIcon from '@material-ui/icons/Delete';

import TableToolbar from '../../../TableToolbar';
import * as actions from '../../../../../state/actions';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    backgroundColor: theme.palette.background.default
  },
  table: {
    minWidth: 150,
  },
});

class DocumentFiles extends React.Component {

  handleAddFile = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => { 
      const { document, onAddFile } = this.props;
      const file = { 
        name: e.target.files[0].name, 
        dateAdded: new Date().toLocaleString() 
      };

      onAddFile(document, file);
    }

    input.click();   
  }

  handleDelete = (file) => {
    const { document, onDeleteFile } = this.props;
    onDeleteFile(document, file);
  }

  render() {
    const { classes, document } = this.props;
    const { files } = document;

    return (
      <Paper className={classes.root}>
        <TableToolbar title="FILES" onCreate={this.handleAddFile} />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date Added</TableCell>

              <TableCell align="right">Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {files.map(file => (
              <TableRow key={file.name}>
                <TableCell component="th" scope="row">
                  {file.name}
                </TableCell>

                <TableCell component="th" scope="row">
                  {file.dateAdded}
                </TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => this.handleDelete(file)} edge="end" aria-label="Delete">
                    <DeleteIcon />
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAddFile: (document, file) => {
      dispatch(actions.documentsAddFile(document.id, file));
    },
    onDeleteFile: (document, file) => {
      dispatch(actions.documentsDeleteFile(document.id, file));
    },
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(DocumentFiles);
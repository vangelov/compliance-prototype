import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { withStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import * as actions from "../../../../state/actions";

const styles = theme => ({
  list: {
    width: '100%',
    maxWidth: 360,
    minWidth: 500,
    backgroundColor: theme.palette.background.default,
  },
});

export class AdminCreateSpecialtyDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            selectedDocumentTypeIds: {}
        };
    }

    handleTextFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    create = () => {
      const { name, selectedDocumentTypeIds } = this.state;
        const ids = Object
          .keys(selectedDocumentTypeIds)
          .filter(id => selectedDocumentTypeIds[id] === true)
          .map(id => Number(id));
        
        const specialty = {
          name,
          documentTypeIds: ids
        };

      
      this.clearState(() => {
        this.props.onCreate(specialty);
      });
    };

    handleDocumentTypeToggle = (documentType) => {
      const { id } = documentType;
      const { selectedDocumentTypeIds } = this.state;

      this.setState({ 
        selectedDocumentTypeIds: {
          ...selectedDocumentTypeIds,
          [id]: !selectedDocumentTypeIds[id]
        } 
      })
    }

    handleClose = () => {
      this.clearState(() => this.props.onClose());
    }

    clearState = (callback) => {
      this.setState({
        selectedDocumentTypeIds: {},
        name: ''
      }, callback);
    }

    render() {
        const {
            open,
            classes,
            documentTypes
        } = this.props;

        const {
            name,
            selectedDocumentTypeIds
        } = this.state;

        return (
            <Dialog open={open} onClose={this.handleClose}>
              <DialogTitle>
                Add Specialty 
              </DialogTitle>

              <DialogContent>
                <TextField
                  required
                  onChange={this.handleTextFieldChange("name")}
                  value={name}
                  autoFocus={true}
                  margin="dense"
                  label="Name"
                  type="string"
                  fullWidth
                />

                <List className={classes.list}>
                  {documentTypes.map(documentType => {
                  const labelId = `checkbox-list-label-${documentType.id}`;

                  return (
                    <ListItem key={documentType.id} role={undefined} onClick={() => this.handleDocumentTypeToggle(documentType)} dense button>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={selectedDocumentTypeIds[documentType.id] === true}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={documentType.name} />
                    </ListItem>
                  );
                })}
              </List>
              </DialogContent>

              <DialogActions>
                <Button onClick={this.handleClose} color="secondary">
                  Cancel
                </Button>

                <Button
                  onClick={this.create}
                  color="primary"
                >
                  Create
                </Button>
              </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
  return {
      documentTypes: state.documentTypes
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate: newSpecialty => {
            dispatch(actions.specialtiesAdd(newSpecialty));
            ownProps.onCreate();
        },
    };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(AdminCreateSpecialtyDialog);


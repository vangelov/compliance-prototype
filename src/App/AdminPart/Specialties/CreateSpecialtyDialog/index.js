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
import MenuItem from "@material-ui/core/MenuItem";
import Typography from '@material-ui/core/Typography';

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

        const { specialty } = this.props;
        let selectedDocumentTypeIds = {};

        if (specialty) {
          for (const documentTypeId of specialty.documentTypeIds) {
            selectedDocumentTypeIds[documentTypeId] = true;
          }
        }

        this.state = {
          opened: true,
          name: specialty ? specialty.name : "",
          parentSpecialtyId: specialty ? specialty.parentId : null,
          selectedDocumentTypeIds
        };
    }

    handleTextFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    create = () => {
      const { name, selectedDocumentTypeIds, parentSpecialtyId } = this.state;
      const { specialty } = this.props;

      const ids = Object
        .keys(selectedDocumentTypeIds)
        .filter(id => selectedDocumentTypeIds[id] === true)
        .map(id => Number(id));
      
      if (specialty) {
        const editedSpecialty = {
          id: specialty.id,
          name,
          documentTypeIds: ids,
          parentId: parentSpecialtyId
        };

        this.props.onEdit(editedSpecialty);
      } else {
        const newSpecialty = {
          name,
          documentTypeIds: ids,
          parentId: parentSpecialtyId
        };

        this.props.onCreate(newSpecialty);
      }

      this.setState({ opened: false });
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

    cancel = () => {
      this.setState({ opened: false });
    }

    close = () => {
      this.props.onClose();
    }

    render() {
        const {
          classes,
          documentTypes,
          specialties,
          specialty
        } = this.props;

        const {
          opened,
          name,
          selectedDocumentTypeIds,
          parentSpecialtyId
        } = this.state;

        const specialtiesWithoutParents = specialties.filter((specialty) => specialty.parentId === null);

        return (
            <Dialog open={opened} onExited={this.close}>
              <DialogTitle>
                {specialty ? 'Edit Specialty' : 'Add Specialty'}
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

              <TextField
                  value={parentSpecialtyId}
                  select
                  onChange={this.handleTextFieldChange("parentSpecialtyId")}
                  fullWidth
                  label="Speciality for"
                  margin="dense"
                >
                  {specialtiesWithoutParents.map((specialty) => (
                      <MenuItem key={specialty.id} value={specialty.id}>
                          {specialty.name}
                      </MenuItem>
                  ))}
                </TextField>

                <Typography style={{marginTop: '20px'}}>Documents</Typography>

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
                <Button onClick={this.cancel} color="secondary">
                  Cancel
                </Button>

                <Button
                  onClick={this.create}
                  color="primary"
                >
                  {specialty ? 'Edit' : 'Create'}
                </Button>
              </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
  return {
      documentTypes: state.documentTypes,
      specialties: state.specialties
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreate: newSpecialty => {
      dispatch(actions.specialtiesAdd(newSpecialty));
    },
    onEdit: editedSpecialty => {
      dispatch(actions.specialtiesEdit(editedSpecialty));
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


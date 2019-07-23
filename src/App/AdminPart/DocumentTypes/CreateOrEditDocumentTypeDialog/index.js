import React from "react";
import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import * as actions from "../../../../state/actions";

const currencies = [
    {
        label: "REQUIRED",
        value: "required"
    },
    {
        label: "OPTIONAL",
        value: "optional"
    },
    {
        label: "N/A",
        value: "n/a"
    }
];

export class AdminCreateOrEditDocumentTypeDialog extends React.Component {

    constructor(props) {
        super(props);

        const { documentType } = props;

        this.state = {
            opened: true,
            name: documentType ? documentType.name : "",
            level: documentType ? documentType.level : "",
            effectiveFrom: documentType ? documentType.effectiveFrom : ""
        };
    }

    handleTextFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };


    createOrEdit = () => {
      const { documentType } = this.props;
      const { name, level, effectiveFrom } = this.state;

      if (documentType) {
        const editedDocumentType = { id: documentType.id, name, level, effectiveFrom };
        this.props.onEdit(editedDocumentType);
      } else {
        const newDocumentType = { name, level, effectiveFrom };
        this.props.onCreate(newDocumentType);
      }

      this.setState({ opened: false });
    };

    cancel = () => {
      this.setState({ opened: false });
    }

    close = () => {
      this.props.onClose();
    }

    render() {
        const {
            name,
            level,
            effectiveFrom,
            opened
        } = this.state;

        const { documentType } = this.props;

        return (
            <Dialog open={opened} onExited={this.close}>
              <DialogTitle>
                {documentType ? 'Edit Document Type' : 'Add Document type'}
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
                  required
                  onChange={this.handleTextFieldChange("level")}
                  value={level}
                  select
                  fullWidth
                  label="Type"
                  margin="dense"
                >
                  {currencies.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                          {label}
                      </MenuItem>
                  ))}
                </TextField>

                <TextField
                  required
                  onChange={this.handleTextFieldChange("effectiveFrom")}
                  value={effectiveFrom}
                  margin="dense"
                  label="Effective From"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </DialogContent>

              <DialogActions>
                <Button onClick={this.cancel} color="secondary">
                  Cancel
                </Button>

                <Button
                  onClick={this.createOrEdit}
                  color="primary"
                >
                  {documentType ? 'Edit' : 'Create'}
                </Button>
              </DialogActions>
            </Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onCreate: newDocumentType => {
        dispatch(actions.documentTypesAdd(newDocumentType));
      },
      onEdit: editedDocumentType => {
        dispatch(actions.documentTypesEdit(editedDocumentType));
      },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(AdminCreateOrEditDocumentTypeDialog);

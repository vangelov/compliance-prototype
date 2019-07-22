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

export class AdminCreateDocumentTypeDialog extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            name: "",
            level: "",
            effectiveFrom: "2017-05-24T10:30"
        };
    }

    handleTextFieldChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    create = () => {
      const { name, level, effectiveFrom } = this.state;
      const documentType = { name, level, effectiveFrom };

      this.clearState(() => {
        this.props.onCreate(documentType);
      });
    };

    close = () => {
      this.clearState(() => {
        this.props.onClose();
      });
    }

    clearState = (callback) => {
      this.setState({
        name: "",
        level: "",
        effectiveFrom: "2017-05-24T10:30"
      }, callback);
    }

    render() {
        const { open } = this.props;

        const {
            name,
            level,
            effectiveFrom,
        } = this.state;

        return (
            <Dialog open={open} onClose={this.close}>
              <DialogTitle>
                Add Document type
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
                <Button onClick={this.close} color="secondary">
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      onCreate: newDocumentType => {
        dispatch(actions.documentTypesAdd(newDocumentType));
        ownProps.onCreate();
      },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(AdminCreateDocumentTypeDialog);

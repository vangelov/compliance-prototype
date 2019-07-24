import React from 'react';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';

class ComplianceGroup extends React.Component {

  render() {
    const { specialties, status } = this.props;

    const statusColor = {
      'approved': 'primary',
      'declined': 'secondary'
    };

    return (
      <AppBar position="static" color="default" style={{ marginTop: "20px", marginBottom: "20px"}}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {specialties.map(({ name }) => name).join(', ')}
          </Typography>

          <Chip
            style={{marginRight: "0px", marginLeft: "auto"}}
            label={status.toUpperCase()}
            color={statusColor[status]}
          />
        </Toolbar>
      </AppBar>
    );
  }
}


export default ComplianceGroup;
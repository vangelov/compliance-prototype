import React from 'react';
import { connect } from "react-redux";

import Document from './Document';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';

class Documents extends React.Component {

  render() {
    const { documents, documentTypes, isForAdmin, compliance } = this.props;
    const documentTypesMap = {};

    for (const documentType of documentTypes) {
      documentTypesMap[documentType.id] = documentType;
    }

    const statusColor = {
      'approved': 'primary',
      'declined': 'secondary'
    };

    return (
      <div>
        <AppBar position="static" color="default" style={{ marginTop: "20px", marginBottom: "20px"}}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            General Band 5, A&E
          </Typography>

          <Chip
            style={{marginRight: "0px", marginLeft: "auto"}}
            label="APPROVED"
            color={statusColor['approved']}
          />
        </Toolbar>
      </AppBar>

      <AppBar position="static" color="default" style={{ marginTop: "20px", marginBottom: "20px"}}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            RMN
          </Typography>

          <Chip
            style={{marginRight: "0px", marginLeft: "auto"}}
            label="DECLINED"
            color={statusColor['declined']}
          />
        </Toolbar>
      </AppBar>
        {documents.map((document) => {
          const documentType = documentTypesMap[document.documentTypeId];

          return (
            <Document 
              key={document.id} 
              document={document} 
              documentType={documentType} 
              isForAdmin={isForAdmin}
            /> 
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      documentTypes: state.documentTypes,
      documents: state.documents,
      compliance: state.compliance
  };
};

export default connect(
  mapStateToProps,
  null
)(Documents);
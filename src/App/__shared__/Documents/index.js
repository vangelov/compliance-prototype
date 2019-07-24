import React from 'react';
import { connect } from "react-redux";

import Document from './Document';

import DocumentSpecialties from './Specialties';
import ComplianceGroup from './ComplianceGroup';

class Documents extends React.Component {

  render() {
    const { documents, documentTypes, isForAdmin, compliance, specialties } = this.props;
    const documentTypesMap = {};

    for (const documentType of documentTypes) {
      documentTypesMap[documentType.id] = documentType;
    }

    const specialtiesMap = {};
    for (const specialty of specialties) {
      specialtiesMap[specialty.id] = specialty;
    }

    const specialtiesGroupedPerStatus = {};

    for (const complianceItem of compliance) {
      if (!specialtiesGroupedPerStatus[complianceItem.status]) {
        specialtiesGroupedPerStatus[complianceItem.status] = [];
      }

      const specialty = specialtiesMap[complianceItem.specialtyId];
      specialtiesGroupedPerStatus[complianceItem.status].push(specialty);
    }

    return (
      <div>
        {!isForAdmin && <DocumentSpecialties />}

        {Object.keys(specialtiesGroupedPerStatus).map((status) => {
          return (
            <ComplianceGroup 
              key={status} 
              specialties={specialtiesGroupedPerStatus[status]} 
              status={status} 
            />
          );
        })}
        
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
      compliance: state.compliance,
      specialties: state.specialties
  };
};

export default connect(
  mapStateToProps,
  null
)(Documents);
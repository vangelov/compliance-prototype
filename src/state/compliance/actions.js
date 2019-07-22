export const COMPLIANCE_UPDATE = 'COMPLIANCE_UPDATE';
export const complianceUpdate = (documents, documentTypes) => ({ 
  type: COMPLIANCE_UPDATE,
  documents,
  documentTypes
});
export const COMPLIANCE_UPDATE = 'COMPLIANCE_UPDATE';
export const complianceUpdate = (documents, documentTypes, specialties) => ({ 
  type: COMPLIANCE_UPDATE,
  documents,
  documentTypes,
  specialties
});
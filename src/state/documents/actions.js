

export const DOCUMENTS_ADD_FILE = 'DOCUMENTS_ADD_FILE';
export const documentsAddFile = (documentId, file) => ({
  type: DOCUMENTS_ADD_FILE,
  documentId,
  file
});

export const DOCUMENTS_DELETE_FILE = 'DOCUMENTS_DELETE_FILE';
export const documentsDeleteFile = (documentId, file) => ({
  type: DOCUMENTS_DELETE_FILE,
  documentId,
  file
});

export const DOCUMENTS_UPDATE_STATUS = 'DOCUMENTS_UPDATE_STATUS';
export const documentsUpdateStatus = (documentId, stampSpecialtyId, status) => ({
  type: DOCUMENTS_UPDATE_STATUS,
  documentId,
  stampSpecialtyId,
  status
});

export const DOCUMENTS_UPDATE_EXPIRY = 'DOCUMENTS_UPDATE_EXPIRY';
export const documentsUpdateExpiry = (documentId, stampSpecialtyId, expiresAt) => ({
  type: DOCUMENTS_UPDATE_EXPIRY,
  documentId,
  stampSpecialtyId,
  expiresAt
});

export const DOCUMENTS_TIME_PASS = 'DOCUMENTS_TIME_PASS';
export const documentsTimePass = (specialties, documentTypes) => ({ 
  type: DOCUMENTS_TIME_PASS, 
  specialties,
  documentTypes 
});

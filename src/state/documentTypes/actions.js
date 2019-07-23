export const DOCUMENT_TYPES_ADD = 'DOCUMENT_TYPES_ADD';
export const documentTypesAdd = (documentType) => ({ type: DOCUMENT_TYPES_ADD, documentType });

export const DOCUMENT_TYPES_EDIT = 'DOCUMENT_TYPES_EDIT';
export const documentTypesEdit = (documentType) => ({ type: DOCUMENT_TYPES_EDIT, documentType });
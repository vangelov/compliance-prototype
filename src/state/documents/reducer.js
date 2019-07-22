import * as actions from "./actions";
import * as documentsUtil from '../../business/documents';

const initialState = [
  
];

function fix(n) {
  if (n < 10) {
    return `0${n}`;
  }
  return n;
}

function distanceInDaysFromNow(expiresAt) {
  const now = new Date();
  const nowStartOfDayDate = new Date(`${now.getFullYear()}-${fix(now.getMonth() + 1)}-${fix(now.getDate())}`);
  const expiresAtDate = new Date(expiresAt.split("T")[0]);

  const diffTime = Math.abs(expiresAtDate.getTime() - nowStartOfDayDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  return diffDays;
}

function documentReducer(document, action) {
  switch(action.type) {
    case actions.DOCUMENTS_ADD_FILE: {
      const { file } = action;

      return {
        ...document,
        files: [...document.files, file],
        status: document.status === 'not_uploaded' ? 
          'pending' : 
          document.status
      }
    }

    case actions.DOCUMENTS_DELETE_FILE: {
      const { file } = action;

      const files = document.files.filter(({ name, dateAdded }) => 
        name !== file.name || dateAdded !== file.dateAdded
      );

      return {
        ...document,
        files,
        status: files.length === 0 ? 'pending' : document.status
      };
    }

    case actions.DOCUMENTS_UPDATE_STATUS: {
      const { status } = action;

      return {
        ...document,
        status
      };
    }

    case actions.DOCUMENTS_UPDATE_EXPIRY: {
      const { expiresAt } = action;

      return {
        ...document,
        expiresAt
      };
    }

    default:
      return document;
  }
}

export default (state = initialState, action) => {
  const { documentId } = action;

  switch (action.type) {
    case actions.DOCUMENTS_ADD_FILE: 
    case actions.DOCUMENTS_DELETE_FILE: 
    case actions.DOCUMENTS_UPDATE_STATUS: 
    case actions.DOCUMENTS_UPDATE_EXPIRY:
      return state.map((document) => {
        if (document.id === documentId) {
          return documentReducer(document, action);
        }

        return document;
      });

    case actions.DOCUMENTS_TIME_PASS: {
      const { nurse, documentTypes } = action;
      const documentTypeForId = {};

      for (const documentType of documentTypes) {
        documentTypeForId[documentType.id] = documentType;
      }
      const updatedDocuments = documentsUtil.update(nurse, documentTypes, state);

      return updatedDocuments
        .map((document) => {
          if (['approved', 'expiring_soon', 'expired'].indexOf(document.status) === -1) {
            return document;
          }

          const documentType = documentTypeForId[document.documentTypeId];
          if (documentType.level !== 'required') {
            return document;
          }

          const daysUntilExpiration = distanceInDaysFromNow(document.expiresAt);
          let updatedDocument = document;
 
          if (document.status === 'approved') {
            if (daysUntilExpiration <= 0) {
              updatedDocument = {
                ...document,
                status: 'expired'
              };
            } else if (daysUntilExpiration > 0 && daysUntilExpiration <= 2) {
              updatedDocument = {
                ...document,
                status: 'expiring_soon'
              };
            }  
          } else if (document.status === 'expiring_soon') {
            if (daysUntilExpiration <= 0) {
              updatedDocument = {
                ...document,
                status: 'expired'
              };
            } else if (daysUntilExpiration > 2) {
              updatedDocument = {
                ...document,
                status: 'approved'
              };
            }  
          } else if (document.status === 'expired') {
            if (daysUntilExpiration > 0 && daysUntilExpiration <= 2) {
              updatedDocument = {
                ...document,
                status: 'expiring_soon'
              };
            } else if (daysUntilExpiration) {
              updatedDocument = {
                ...document,
                status: 'approved'
              };
            }
          }

          return updatedDocument;
        });
      }
      
    default:
      return state;
  }
};

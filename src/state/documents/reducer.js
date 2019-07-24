import * as actions from "./actions";
import * as documentsUtil from '../../business/documents';
import { distanceInDaysFromNow } from '../__shared__/dateUtil';

const initialState = [
  
];


function documentReducer(document, action) {
  switch(action.type) {
    case actions.DOCUMENTS_ADD_FILE: {
      const { file } = action;

      return {
        ...document,
        files: [...document.files, file],
        stamps: document.stamps.map((stamp) => ({
          ...stamp,
          status: stamp.status === 'not_uploaded' ?
            'pending' : 
            stamp.status
        }))
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
        stamps: document.stamps.map((stamp) => ({
          ...stamp,
          status: files.length === 0 ? 'pending' : stamp.status
        }))
      };
    }

    case actions.DOCUMENTS_UPDATE_STATUS: {
      const { status, stampSpecialtyId } = action;

      return {
        ...document,
        stamps: document.stamps.map((stamp) => {
          if (stamp.specialtyId === stampSpecialtyId) {
            return {
              ...stamp,
              status
            };
          }

          return stamp;
        })
      };
    }

    case actions.DOCUMENTS_UPDATE_EXPIRY: {
      const { expiresAt, stampSpecialtyId } = action;

      return {
        ...document,
        stamps: document.stamps.map((stamp) => {
          if (stamp.specialtyId === stampSpecialtyId) {
            return {
              ...stamp,
              expiresAt
            };
          }

          return stamp;
        })
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
      const { specialties, documentTypes } = action;
      const documentTypeForId = {};

      for (const documentType of documentTypes) {
        documentTypeForId[documentType.id] = documentType;
      }

      const updatedDocuments = documentsUtil.update(specialties, state);

      return updatedDocuments.map((document) => {
        const documentType = documentTypeForId[document.documentTypeId];
        if (documentType.level !== 'required') {
          return document;
        }

        const updatedStamps = document.stamps.map((stamp) => {
          if (['approved', 'expiring_soon', 'expired'].indexOf(stamp.status) === -1) {
            return stamp;
          }
          if (!stamp.expiresAt) {
            return stamp;
          }

          const daysUntilExpiration = distanceInDaysFromNow(stamp.expiresAt);
          if (stamp.status === 'approved') {
            if (daysUntilExpiration <= 0) {
              return {
                ...stamp,
                status: 'expired'
              };
            } else if (daysUntilExpiration > 0 && daysUntilExpiration <= 2) {
              return {
                ...stamp,
                status: 'expiring_soon'
              };
            }  
          } else if (stamp.status === 'expiring_soon') {
            if (daysUntilExpiration <= 0) {
              return {
                ...stamp,
                status: 'expired'
              };
            } else if (daysUntilExpiration > 2) {
              return {
                ...stamp,
                status: 'approved'
              };
            }  
          } else if (document.status === 'expired') {
            if (daysUntilExpiration > 0 && daysUntilExpiration <= 2) {
              return {
                ...stamp,
                status: 'expiring_soon'
              };
            } else if (daysUntilExpiration) {
              return {
                ...stamp,
                status: 'approved'
              };
            }
          }

          return stamp;
        });

        return {
          ...document,
          stamps: updatedStamps
        };
      });
    }
      
    default:
      return state;
  }
};

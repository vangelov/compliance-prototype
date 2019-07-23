import * as actions from "./actions";
import { distanceInDaysFromNow } from '../__shared__/dateUtil';

const initialState = {
  status: 'pending'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.COMPLIANCE_UPDATE: {
      const { documents, documentTypes } = action;
      const documentTypeForId = {};

      if (documents.length === 0 || documentTypes.legnth === 0) {
        return state;
      }

      for (const documentType of documentTypes) {
        documentTypeForId[documentType.id] = documentType;
      }

      let declinedCount = 0;
      let approvedCount = 0;

      for (const document of documents) {
        if (document.level === 'optioanl' || document.level === 'n/a') {
          continue;
        }
      
        const documentType = documentTypeForId[document.documentTypeId];
        if (distanceInDaysFromNow(documentType.effectiveFrom) !== 0) {
          continue;
        }

        if (state.status === 'approved' && document.status === 'expiring_soon') {
          return {
            status: 'expiring_soon'
          };
        }

        if ((state.status === 'approved' || state.status === 'expiring_soon') && document.status === 'expired') {
          return {
            status: 'expired'
          };
        }

        if (document.status === 'approved') {
          approvedCount += 1;
        }

        if (document.status === 'declined') {
          declinedCount += 1;
        }
      }

      if (declinedCount === documents.length) {
        return {
          status: 'declined'
        }
      }

      if (approvedCount === documents.length) {
        return {
          status: 'approved'
        }
      }

      return {
        status: 'pending'
      };
    }

    default:
      return state;
  }
};

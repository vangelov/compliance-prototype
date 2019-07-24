import * as actions from "./actions";

const initialState = [
  { specialtyId: 0, status: 'pending' }
];

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.COMPLIANCE_UPDATE: {
      const { documents, documentTypes, specialties } = action;

      if (documents.length === 0 || documentTypes.legnth === 0) {
        return state;
      }

      const documentTypeForId = {};

      for (const documentType of documentTypes) {
        documentTypeForId[documentType.id] = documentType;
      }

      const compliances = [];

      for (const specialty of specialties) {
        const stampsForSpecialty = [];

        for (const document of documents) {
          const documentType = documentTypeForId[document.documentTypeId];
          if (documentType.level === 'optional' || documentType.level === 'n/a') {
            continue;
          }
          if (new Date(documentType.effectiveFrom).getTime() > new Date().getTime()) {
            continue;
          }

          for (const stamp of document.stamps) {
            if (stamp.specialtyId === specialty.id) {
              stampsForSpecialty.push(stamp);
            }
          }
        }

        if (stampsForSpecialty.length === 0) {
          console.log('sp', documents, specialties);
        }

        const status = complianceStatusForStamps(stampsForSpecialty);

        compliances.push({
          specialtyId: specialty.id,
          status
        });
      }

      return compliances;
    }

    default:
      return state;
  }
};

function complianceStatusForStamps(stamps) {
  let declinedCount = 0;
  let approvedCount = 0;


  for (const stamp of stamps) {
    if (stamp.status === 'expiring_soon') {
      return 'expiring_soon'
    }

    if (stamp.status === 'expired') {
      return 'expired';
    }

    if (stamp.status === 'approved') {
      approvedCount += 1;
    }

    if (stamp.status === 'declined') {
      declinedCount += 1;
    }
  }

  if (declinedCount === stamps.length) {
    console.log('here', declinedCount, stamps.length);
    return 'declined';
  }

  if (approvedCount === stamps.length) {
    return 'approved';
  }

  return 'pending';
}
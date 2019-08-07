import * as actions from "./actions";

const initialState = [
  { id: 0, name: 'NMC Pin Entry', level: 'required', effectiveFrom: '2016-05-23' },
  { id: 1, name: 'DBS CERTIFICATE', level: 'required', effectiveFrom: '2016-05-23' },
  { id: 2, name: 'PASSPORT', level: 'required', effectiveFrom: '2016-05-23' },
  { id: 3, name: 'CLINICIAN CERTIFICATE', level: 'required', effectiveFrom: '2016-05-23' },
  { id: 4, name: 'CLINICIAN TRAINING', level: 'required', effectiveFrom: '2016-05-23' }
];

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.DOCUMENT_TYPES_ADD:
          return [
            ...state,
            { id: state.length, ...action.documentType }
          ];

        case actions.DOCUMENT_TYPES_EDIT: {
            const { documentType } = action;

            return state.map((currentDocumentType) => {
              if (documentType.id === currentDocumentType.id) {
                return documentType;
              }

              return currentDocumentType;
            });
          }

        default:
            return state;
    }
};

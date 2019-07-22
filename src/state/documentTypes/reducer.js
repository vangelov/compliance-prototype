import * as actions from "./actions";

const initialState = [
  { id: 0, name: 'NMC Pin Entry', level: 'required', effectiveFrom: '2016-05-23' },
  { id: 1, name: 'DBS CERTIFICATE', level: 'required', effectiveFrom: '2016-05-23' },
  { id: 2, name: 'PASSPORT', level: 'required', effectiveFrom: '2016-05-23' }
]

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.DOCUMENT_TYPE_ADD:
          return [
            ...state,
            { id: state.length + 1, ...action.documentType }
          ];

        default:
            return state;
    }
};

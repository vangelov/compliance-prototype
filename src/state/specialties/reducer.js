import * as actions from "./actions";

const initialState = [
  { id: 0, name: "General Band5", documentTypeIds: [0, 1, 2] }
]

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SPECIALTIES_ADD:
          return [
            ...state,
            { id: state.length, ...action.specialty }
          ];

        case actions.SPECIALTIES_EDIT: {
          const { specialty } = action;

          return state.map((currentSpecialty) => {
            if (specialty.id === currentSpecialty.id) {
              return specialty;
            }

            return currentSpecialty;
          });
        }

        default:
            return state;
    }
};

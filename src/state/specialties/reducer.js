import * as actions from "./actions";

const initialState = [
  { id: 0, name: "Band5 Nurse", documentTypeIds: [0, 1, 2], parentId: null },
  { id: 2, name: "RMN Nurse", documentTypeIds: [0, 1], parentId: 0 },

  { id: 1, name: "Clinician", documentTypeIds: [3, 4], parentId: null },

  { id: 3, name: "Hygienist", documentTypeIds: [4], parentId: 1 },



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

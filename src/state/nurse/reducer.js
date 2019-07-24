import * as actions from "./actions";

const initialState = {
  appliedSpecialtiesIds: [0]
};

export default (state = initialState, action) => {
    switch (action.type) {
      case actions.NURSE_ADD_SPECIALTY:
        return {
          ...state,
          appliedSpecialtiesIds: [...state.appliedSpecialtiesIds, action.specialtyId]
        };
      
      case actions.NURSE_REMOVE_SPECIALTY:
        return {
          ...state,
          appliedSpecialtiesIds: state.appliedSpecialtiesIds.filter(
            (specialtyId) => specialtyId !== action.specialtyId
          )
        };

      default:
          return state;
    }
};
